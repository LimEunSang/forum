import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.status(401).json();

      // request.body: (전송)JSON.stringify → (수신)JSON.parse
      request.body = JSON.parse(request.body);

      // '작성자 정보' 항목 추가
      request.body.author = {
        email: session.user.email,
        name: session.user.name,
      };

      // 빈 제목이나 내용이 입력되면 거부
      if (!request.body.title || !request.body.content) {
        return response.status(400).json();
      }

      // '작성 시간' 항목 추가
      request.body.creationDate = new Date().toJSON();

      const client = await connectDB;
      const db = client.db("forum");
      const result = await db.collection("post").insertOne(request.body);

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json();
    }
  }
}
