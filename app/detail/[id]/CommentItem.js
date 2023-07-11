"use client";

import { useState } from "react";
import CommentEdit from "./CommentEdit";
import $ from "jquery";

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
          onClick={() => {
            fetch(`/api/comment/delete?id=${item._id}`, { method: "DELETE" })
              .then((response) => {
                if (response.status == 200) {
                  // document.getElementById(item._id).style.opacity = 0;
                  $(`#${item._id}`).css("opacity", "0"); // jquery 사용하여 위 코드 작성
                  setTimeout(() => {
                    getData();
                    /* $(`#${item._id}`).css("display", "none");
                       위 코드를 사용하는 것보다 정직하지만 서버에 과부하를 줄 수 있음 */
                  }, 1000);
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
    <div className="commentItem" id={item._id}>
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
