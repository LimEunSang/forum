import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    try {
      let session = await getServerSession(request, response, authOptions);

      const client = await connectDB;
      const db = client.db("forum");
      let findedPost = await db
        .collection("post")
        .findOne({ _id: new ObjectId(request.query.id) });

      if (
        session &&
        (session.user.email == findedPost.author ||
          session.user.role == "admin")
      ) {
        let result = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(request.query.id) });

        return response.status(200).json(result);
      } else {
        return response
          .status(500)
          .json({ error: "작성자만 게시물을 삭제할 수 있습니다!" });
      }
    } catch (error) {
      return response.status(500).json({ error: "DB 연결에 실패하였습니다!" });
    }
  }
}
