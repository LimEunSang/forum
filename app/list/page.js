import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  // Warning: Only plain objects can be passed to Client Components from Server Components.
  //          Objects with toJSON methods are not supported.
  //          Convert it manually to a simple value before passing it to props.
  //          {_id: {}, title: ..., content: ...}
  result = result.map((object) => {
    object._id = object._id.toString();
    return object;
  });

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
