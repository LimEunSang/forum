"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function Comment({ parent, session }) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    fetch(`/api/comment/list?parent=${parent}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="comment">
      {session && (
        <>
          <textarea
            id="commentInput"
            placeholder="댓글을 작성하세요"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div className="commentBtnBox">
            <button
              className="uncommonBtn commentBtn"
              onClick={() => {
                fetch("/api/comment/new", {
                  method: "POST",
                  body: JSON.stringify({ comment: comment, parent: parent }),
                })
                  .then(() => {
                    getData();
                    document.getElementById("commentInput").value = "";
                    setComment("");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              댓글 작성
            </button>
          </div>
        </>
      )}
      {!loading ? (
        data.map((item, key) => (
          <div className="commentItem" key={key}>
            <p className="author">{item.author}</p>
            <p className="content">{item.comment}</p>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}
