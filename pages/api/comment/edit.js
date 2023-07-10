import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.status(401).json();

      // request.body: (전송)JSON.stringify → (수신)JSON.parse
      request.body = JSON.parse(request.body);

      const client = await connectDB;
      const db = client.db("forum");

      const findedComment = await db
        .collection("comment")
        .findOne({ _id: new ObjectId(request.body.id) });

      // 관리자, 작성자가 아닌 경우 수정 거부
      if (
        session.user.role != "admin" &&
        session.user.email != findedComment.author
      ) {
        return response.status(403).json();
      }

      // 내용이 없으면 수정 거부
      if (!request.body.comment) {
        return response.status(400).json();
      }

      const result = await db
        .collection("comment")
        .updateOne(
          { _id: new ObjectId(request.body.id) },
          { $set: { comment: request.body.comment } }
        );

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json();
    }
  }
}
