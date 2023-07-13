"use client";

import { useCommentList } from "@/app/utils/useCustom";
import CommentItem from "./CommentItem";
import Loading from "../loading";

export default function CommentList({ parent, session }) {
  const { data, isLoading } = useCommentList(parent);

  if (isLoading) return <Loading />;
  return (
    <div className="commentList">
      {data.map((item, key) => (
        <CommentItem item={item} key={key} session={session} />
      ))}
    </div>
  );
}
