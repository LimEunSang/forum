import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    if (request.body.title == "" || request.body.content == "") {
      return response.status(400).json("제목이나 내용 작성해라");
    }

    try {
      const client = await connectDB;
      const db = client.db("forum");
      const result = await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(request.body._id) },
          { $set: { title: request.body.title, content: request.body.content } }
        );

      response.redirect(302, "/list");
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
