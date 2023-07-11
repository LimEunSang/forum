"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import $ from "jquery";

export default function CommentWrite({ parent, getData, session }) {
  const router = useRouter();

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
                      getData();
                      // document.getElementById("commentInput").value = "";
                      $("#commentInput").val(""); // jquery 사용하여 위 코드 작성
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
