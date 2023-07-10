import CommentItem from "./CommentItem";

export default function CommentList({ data, getData, session }) {
  return (
    <div className="commentList">
      {data.map((item, key) => (
        <CommentItem
          item={item}
          key={key}
          getData={getData}
          session={session}
        />
      ))}
    </div>
  );
}
