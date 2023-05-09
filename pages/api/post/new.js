import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method == "POST") {
    request.body = JSON.parse(request.body);

    if (session) {
      request.body.author = session.user.email; // request.body에 { author: email } 항목 추가
    }

    if (request.body.title == "" || request.body.content == "") {
      return response.status(400).json("제목이나 내용 작성해라");
    }

    try {
      const client = await connectDB;
      const db = client.db("forum");
      let result = await db.collection("post").insertOne(request.body);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
