import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) return response.status(401).json();

      if (!JSON.parse(request.body).comment) {
        return response.status(400).json();
      }

      const data = {
        comment: JSON.parse(request.body).comment,
        parent: new ObjectId(JSON.parse(request.body).parent),
        author: { email: session.user.email, name: session.user.name },
      };

      const client = await connectDB;
      const db = client.db("forum");
      const result = await db.collection("comment").insertOne(data);

      return response.status(200).json();
    } catch (error) {
      return response.status(500).json();
    }
  }
}
