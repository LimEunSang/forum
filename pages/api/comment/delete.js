import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.status(401).json();

      const client = await connectDB;
      const db = client.db("forum");
      const result = await db.collection("comment").deleteOne({
        _id: new ObjectId(request.query.id),
      });

      return response.status(200).json();
    } catch (error) {
      console.log(error);
      return response.status(500).json();
    }
  }
}
