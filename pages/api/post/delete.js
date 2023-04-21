import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    try {
      //   console.log(JSON.parse(request.body));
      const client = await connectDB;
      const db = client.db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(JSON.parse(request.body)._id) });
      response.redirect(302, "/list");
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
