"use client";

import { useEffect, useState } from "react";

export default function Comment({ parent }) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  const getData = () => {
    fetch(`/api/comment/list?parent=${parent}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <hr />
      <div>댓글목록보여줄부분</div>
      {!loading
        ? data.map((item, key) => (
            <div key={key}>
              <p style={{ marginBottom: "0px" }}>[{item.author}]</p>
              <p style={{ marginTop: "0px" }}>{item.comment}</p>
            </div>
          ))
        : "loading.."}
      <input
        id="commentInput"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, parent: parent }),
          })
            .then((response) => {
              if (response.status == 200) {
                getData();
                document.getElementById("commentInput").value = "";
                setComment("");
              } else {
                return response.json().then((error) => {
                  throw new Error(error.error);
                });
              }
            })
            .catch((error) => {
              alert(error.message);
            });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}