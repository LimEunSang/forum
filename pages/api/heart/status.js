import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "GET") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.status(200).json(null);

      const client = await connectDB;
      const db = client.db("forum");
      const result = await db.collection("heart").findOne({
        userId: new ObjectId(session.user.id),
        postId: new ObjectId(request.query.parent),
      });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json();
    }
  }
}
