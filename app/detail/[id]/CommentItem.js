"use client";

import { useState } from "react";
import CommentEdit from "./CommentEdit";

export default function CommentItem({ item, getData, session }) {
  const [isEdit, setIsEdit] = useState(false);

  const authorityCheck = () => {
    if (!session) return false;
    return session.role === "admin" || session.user.email === item.author.email;
  };

  const CommentManage = () => {
    return (
      <div className="commentManage">
        <span
          onClick={() => {
            setIsEdit(true);
          }}
        >
          수정
        </span>
        <span
          onClick={(e) => {
            fetch(`/api/comment/delete?id=${item._id}`, { method: "DELETE" })
              .then((response) => {
                if (response.status == 200) {
                  e.target.parentElement.parentElement.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.parentElement.parentElement.style.display =
                      "none";
                  }, 1000);
                  /* 위 코드 버그 발생.
                     삭제하지 않은 엄한 놈한테 설정이 적용됨 */
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          삭제
        </span>
      </div>
    );
  };

  return (
    <div className="commentItem" id="commentItem">
      <div className="wrapper">
        <p className="author">
          {item.author.name} [{item.author.email}]
        </p>
        {!isEdit && authorityCheck() && <CommentManage />}
      </div>
      {isEdit ? (
        <CommentEdit item={item} setIsEdit={setIsEdit} getData={getData} />
      ) : (
        <p className="content">{item.comment}</p>
      )}
    </div>
  );
}
