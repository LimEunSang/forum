import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  const client = await connectDB;
  const db = client.db("forum");

  if (request.method == "GET") {
    let result = await db.collection("post").find().toArray();
    return response.status(200).json(result);
  }

  if (request.method == "POST") {
    let result = await db.collection("post").insertOne(request.body);
    return response.status(200).json(request.body);
  }
}
