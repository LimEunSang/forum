import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.status(401).json();

      const data = {
        userId: new ObjectId(session.user.id),
        postId: new ObjectId(request.body),
      };

      const client = await connectDB;
      const db = client.db("forum");
      const result = await db.collection("heart").insertOne(data);

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json();
    }
  }
}
