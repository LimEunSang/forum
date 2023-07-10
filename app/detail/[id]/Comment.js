"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import CommentWrite from "./CommentWrite";
import CommentList from "./CommentList";

export default function Comment({ parent, session }) {
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
      {/* 댓글 작성 */}
      {<CommentWrite parent={parent} getData={getData} session={session} />}

      {/* 댓글 목록 */}
      {loading ? (
        <Loading />
      ) : (
        <CommentList data={data} getData={getData} session={session} />
      )}
    </div>
  );
}
