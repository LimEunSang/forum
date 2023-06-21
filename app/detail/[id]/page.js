import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import Heart from "./Heart";
import { notFound } from "next/navigation";

const Detail = async (props) => {
  const client = await connectDB;
  const db = client.db("forum");
  const result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  if (result === null) return notFound();

  return (
    <div className="detail">
      <h1>{result.title}</h1>
      {result.imgURL && (
        <div className="imgBox">
          <img src={result.imgURL} alt="img" />
        </div>
      )}
      <p>{result.content}</p>
      <hr />
      <Comment parent={result._id.toString()} />
      <Heart parent={result._id.toString()} />
    </div>
  );
};

export default Detail;
