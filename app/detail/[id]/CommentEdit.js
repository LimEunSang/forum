"use client";

import { useState } from "react";

export default function CommentEdit({ item, setIsEdit, getData }) {
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
                  getData();
                  setIsEdit(false);
                  /* 위 코드 문제 발생.
                     삭제 시 적용하는 스타일 적용 버그 때문에 이상하게 동작함 */
                  // window.location.replace("/detail/" + item.parent);
                  /* 그렇다고 위와 같이 페이지를 자체를 새로고침하면 너무 비효율적임 */
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
