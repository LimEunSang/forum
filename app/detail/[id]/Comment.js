"use client";

import { useEffect, useState } from "react";

export default function Comment({ parent }) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/list?parent=${parent}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <hr />
      <div>댓글목록보여줄부분</div>
      {data.length > 0
        ? data.map((item, key) => <p key={key}>{item.comment}</p>)
        : "댓글 없음 / 로딩 중.."}
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
