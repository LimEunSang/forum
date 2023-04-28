import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method == "GET") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      let result = await db
        .collection("comment")
        .find({ parent: new ObjectId(request.query.parent) })
        .toArray();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
