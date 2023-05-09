import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import Heart from "./Heart";
import { notFound } from "next/navigation";

const Detail = async (props) => {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  if (result === null) return notFound();

  return (
    <>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <img src={result.imgURL} />
      <br />
      <Heart parent={result._id.toString()} />
      <Comment parent={result._id.toString()} />
    </>
  );
};

export default Detail;
