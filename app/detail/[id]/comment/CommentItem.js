"use client";

import { useState } from "react";
import CommentEdit from "./CommentEdit";
import $ from "jquery";
import { useSWRConfig } from "swr";
import { canManage } from "@/app/utils/authCheck";

export default function CommentItem({ item, session }) {
  const { mutate } = useSWRConfig();

  const [isEdit, setIsEdit] = useState(false);

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
                  $(`#${item._id}`).css("opacity", "0");
                  setTimeout(() => {
                    $(`#${item._id}`).css("display", "none");
                    mutate(`/api/comment/count?parent=${item.parent}`);
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
        {!isEdit && canManage(session, item) && <CommentManage />}
      </div>
      {isEdit ? (
        <CommentEdit item={item} setIsEdit={setIsEdit} />
      ) : (
        <p className="content">{item.comment}</p>
      )}
    </div>
  );
}
