"use client";

import { useState } from "react";

export default function Comment() {
  let [comment, setComment] = useState("");
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
          fetch("/URL", { method: "POST", body: comment });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
