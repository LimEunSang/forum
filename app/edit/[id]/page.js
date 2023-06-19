import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div className="writeForm">
      <form action="/api/post/edit" method="POST">
        <input
          className="titleInput"
          name="title"
          defaultValue={result.title}
        />
        <textarea
          className="contentInput"
          name="content"
          defaultValue={result.content}
        />
        <input
          style={{ display: "none" }}
          name="_id"
          value={result._id.toString()}
        />
        <div className="btnWrapper">
          <button className="commonBtn" type="submit">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
