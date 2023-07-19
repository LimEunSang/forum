"use client";

import { useEffect, useState } from "react";

export default function Heart({ parent, session }) {
  const [isHeart, setIsHeart] = useState(false);
  const [count, setCount] = useState(0);

  // HeartBtn Component
  const HeartBtn = () => {
    const btn = isHeart ? "💖" : "🩶";
    const address = isHeart ? "delete" : "new";
    const method = isHeart ? "DELETE" : "POST";

    const HeartBtnHandler = () => {
      fetch(`/api/heart/${address}`, { method: method, body: parent })
        .then((response) => {
          if (response.status == 200) {
            isHeart ? setCount(count - 1) : setCount(count + 1);
            setIsHeart(!isHeart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <button
        className="icon"
        onClick={HeartBtnHandler}
        disabled={!session && "disabled"}
        style={{ cursor: session ? "pointer" : "auto" }}
      >
        {btn}
      </button>
    );
  };

  const getData = () => {
    // heart 유무
    fetch(`/api/heart/status?parent=${parent}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) setIsHeart(true);
      })
      .catch((error) => {
        console.log(error);
      });

    // 게시물 heart 개수
    fetch(`/api/heart/count?parent=${parent}`)
      .then((response) => response.json())
      .then((data) => {
        setCount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="heart component">
      <HeartBtn />
      <span className="count">{count}</span>
    </div>
  );
}
