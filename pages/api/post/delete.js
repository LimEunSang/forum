import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(request.body) });

      if (result.deletedCount == 1) {
        return response.status(200).json(result);
      } else {
        return response.status(500).json(result);
      }
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
