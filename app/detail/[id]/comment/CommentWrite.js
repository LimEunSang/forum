"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import $ from "jquery";
import { useSWRConfig } from "swr";

export default function CommentWrite({ parent, session }) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [comment, setComment] = useState("");

  return (
    <div className="commentWrite">
      <textarea
        id="commentInput"
        placeholder="댓글을 작성하세요"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className="commentBtnBox">
        <button
          className="commonBtn commentBtn"
          onClick={() => {
            session
              ? fetch("/api/comment/new", {
                  method: "POST",
                  body: JSON.stringify({ comment: comment, parent: parent }),
                })
                  .then((response) => {
                    if (response.status == 200) {
                      mutate(`/api/comment/list?parent=${parent}`);
                      $("#commentInput").val("");
                      setComment("");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              : router.push("/api/auth/signin");
          }}
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
}
