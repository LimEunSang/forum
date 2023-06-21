import { connectDB } from "@/util/database";
import PostList from "./components/PostList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.reverse(); // 최신 게시물을 앞에 위치

  // Warning: Only plain objects can be passed to Client Components from Server Components.
  //          Objects with toJSON methods are not supported.
  //          Convert it manually to a simple value before passing it to props.
  //          {_id: {}, title: ..., content: ...}
  result = result.map((object) => {
    object._id = object._id.toString();
    return object;
  });

  return <PostList result={result} user={session && session.user} />;
}
