import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method == "POST") {
    try {
      if (!session) {
        return response
          .status(500)
          .json({ error: "로그인 후 사용할 수 있습니다" });
      }

      if (JSON.parse(request.body).comment == "") {
        return response.status(500).json({ error: "내용을 입력하세요" });
      }

      let data = {
        comment: JSON.parse(request.body).comment,
        parent: new ObjectId(JSON.parse(request.body).parent),
        author: session.user.email,
      };

      const client = await connectDB;
      const db = client.db("forum");
      let result = await db.collection("comment").insertOne(data);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error: "DB 연결 실패" });
    }
  }
}
