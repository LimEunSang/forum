import { connectDB } from "@/util/database";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((object, key) => (
        <>
          <div className="list-item" key={key}>
            <h4>{object.title}</h4>
            <p>{object.content}</p>
          </div>
        </>
      ))}
    </div>
  );
}
