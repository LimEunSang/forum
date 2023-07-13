"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";

export default function CommentEdit({ item, setIsEdit }) {
  const { mutate } = useSWRConfig();

  const [comment, setComment] = useState(item.comment);

  return (
    <div className="commentWrite">
      <textarea
        id="commentInput"
        placeholder="댓글을 작성하세요"
        defaultValue={item.comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className="commentBtnBox">
        <button
          className="uncommonBtn cancelBtn"
          onClick={() => {
            setIsEdit(false);
          }}
        >
          취소
        </button>
        <button
          className="commonBtn commentBtn"
          onClick={() => {
            fetch("/api/comment/edit", {
              method: "POST",
              body: JSON.stringify({ id: item._id, comment: comment }),
            })
              .then((response) => {
                if (response.status == 200) {
                  mutate(`/api/comment/list?parent=${item.parent}`);
                  setIsEdit(false);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          댓글 수정
        </button>
      </div>
    </div>
  );
}
