import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "GET") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      const result = await db
        .collection("comment")
        .find({ parent: new ObjectId(request.query.parent) })
        .toArray();

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json();
    }
  }
}
