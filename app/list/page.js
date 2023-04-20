import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((object, key) => (
        <>
          <div className="list-item" key={key}>
            <Link href={"/detail/" + object._id}>
              <h4>{object.title}</h4>
              <p>1월 1일</p>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
}
