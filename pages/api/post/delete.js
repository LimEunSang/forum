import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    try {
      // console.log(request.body);

      const client = await connectDB;
      const db = client.db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(request.body) });

      // console.log(result);
      // { acknowledged: true, deletedCount: 1 }

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
