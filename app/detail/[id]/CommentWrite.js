"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
                      document.getElementById("commentInput").value = "";
                      setComment("");
                      /* 위 코드 문제 발생.
                         이슈 #15 참조 */
                      // window.location.replace("/detail/" + parent);
                      /* 그렇다고 위와 같이 페이지를 새로고침하면 너무 비효율적임 */
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
