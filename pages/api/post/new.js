import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (request.method == "POST") {
    request.body = JSON.parse(request.body);

    // 빈 제목이나 내용이 입력되면 거부
    if (request.body.title == "" || request.body.content == "") {
      return response.status(400).json("제목이나 내용 작성해라");
    }

    // '로그인 사용자 정보' 항목 추가
    if (session) {
      request.body.author = {
        email: session.user.email,
        name: session.user.name,
      };
    }

    // '작성 시간' 항목 추가
    request.body.creationDate = new Date().toJSON();

    try {
      const client = await connectDB;
      const db = client.db("forum");
      const result = await db.collection("post").insertOne(request.body);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
