import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == "GET") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      let result = await db.collection("post").find().toArray();

      result = result.reverse();

      result = result.map((object) => {
        object._id = object._id.toString();
        return object;
      });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json();
    }
  }
}
