import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { notFound } from "next/navigation";
import CommentWrite from "./comment/CommentWrite";
import CommentList from "./comment/CommentList";
import Sidebar from "./sidebar/Sidebar";

const Detail = async (props) => {
  const session = await getServerSession(authOptions);

  const client = await connectDB;
  const db = client.db("forum");
  const result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  if (!result) return notFound();
  return (
    <div className="detail">
      {/* sidebar */}
      <Sidebar parent={result._id.toString()} session={session} />
      <div>수정중</div>

      {/* 제목 */}
      <h1>{result.title}</h1>

      {/* 이미지 */}
      {result.imgURL && (
        <div className="imgBox">
          <img src={result.imgURL} alt="img" />
        </div>
      )}

      {/* 내용 */}
      <p>{result.content}</p>

      <hr />

      {/* 댓글 */}
      <div className="comment">
        <CommentWrite parent={result._id.toString()} session={session} />
        <CommentList parent={result._id.toString()} session={session} />
      </div>
    </div>
  );
};

export default Detail;
