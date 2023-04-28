"use client";

import { useEffect, useState } from "react";

export default function Comment({ parent }) {
  let [comment, setComment] = useState("");

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <div>
      <div>댓글목록보여줄부분</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, parent: parent }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
