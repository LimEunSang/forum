import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.status(401).json();

      const client = await connectDB;
      const db = client.db("forum");

      const findedComment = await db
        .collection("comment")
        .findOne({ _id: new ObjectId(request.query.id) });

      // 관리자, 작성자가 아닌 경우 삭제 거부
      if (
        session.user.role != "admin" &&
        session.user.email != findedComment.author.email
      ) {
        return response.status(403).json();
      }

      const result = await db.collection("comment").deleteOne({
        _id: new ObjectId(request.query.id),
      });

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json();
    }
  }
}
