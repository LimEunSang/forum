import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.redirect(302, "/api/auth/signin");

      const client = await connectDB;
      const db = client.db("forum");

      const findedPost = await db
        .collection("post")
        .findOne({ _id: new ObjectId(request.body._id) });

      // 관리자, 작성자가 아닌 경우 수정 거부
      if (
        session.user.role != "admin" &&
        session.user.email != findedPost.author.email
      ) {
        return response.status(403).json();
      }

      if (!request.body.title || !request.body.content) {
        return response.status(400).json();
      }

      const result = await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(request.body._id) },
          { $set: { title: request.body.title, content: request.body.content } }
        );

      return response.redirect(302, `/detail/${request.body._id}`);
    } catch (error) {
      return response.status(500).json();
    }
  }
}
