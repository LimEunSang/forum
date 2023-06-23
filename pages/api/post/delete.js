import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

/* request.body로 데이터를 전송하는 경우 (비교 예시용 코드)
   실제 구현은 request.query로 구현 */
export default async function handler(request, response) {
  if (request.method == "DELETE") {
    try {
      const client = await connectDB;
      const db = client.db("forum");
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(request.body) });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
