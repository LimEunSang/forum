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

  /* server에서 client로 ObjectId 자료형 객체를 전달할 때 경고문 발생
     → string 자료형으로 변환하여 전달 */
  result = result.map((object) => {
    object._id = object._id.toString();
    return object;
  });

  return <PostList result={result} user={session && session.user} />;
}
