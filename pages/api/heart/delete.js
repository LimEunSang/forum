import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method == "DELETE") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      let result = await db.collection("heart").deleteOne({
        userId: new ObjectId(session.user.id),
        postId: new ObjectId(request.body),
      });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
