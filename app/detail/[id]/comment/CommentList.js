"use client";

import { useCommentList } from "@/app/utils/useCustom";
import CommentItem from "./CommentItem";
import Loading from "../loading";

export default function CommentList({ parent, session }) {
  const { data, isLoading } = useCommentList(parent);

  if (isLoading) return <Loading />;
  return (
    <div className="commentList">
      {data.length ? (
        data.map((item) => (
          <CommentItem key={item._id} item={item} session={session} />
        ))
      ) : (
        <span className="text">
          아직 댓글이 없습니다. 먼저 대화를 시도해보세요!
        </span>
      )}
    </div>
  );
}
