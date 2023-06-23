"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

export default function Heart({ parent }) {
  const [loading, setLoading] = useState(true);
  const [isHeart, setIsHeart] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const getData = () => {
    fetch(`/api/heart/list?parent=${parent}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) setIsHeart(true);
        setLoading(false);
      })
      .catch((error) => {
        console(error);
      });
  };

  // cf. scroll 시 fix - https://wazacs.tistory.com/28, https://wazacs.tistory.com/30
  const handleScroll = () => {
    // scroll 값 저장
    setScrollY(window.pageYOffset);
  };

  // scroll 값을 실시간 감시
  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", handleScroll);
      // addEventListener: scroll 행위 여부 판단
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // eventlistener을 삭제해줘야 스크롤 할 때 2, 3번씩 렌더되지 않음
    };
  });

  // HeartBtn Component
  const HeartBtn = () => {
    const btn = isHeart ? "💖" : "🤍";
    const address = isHeart ? "delete" : "new";
    const method = isHeart ? "DELETE" : "POST";

    const HeartBtnHandler = () => {
      fetch(`/api/heart/${address}`, { method: method, body: parent })
        .then(() => {
          setIsHeart(!isHeart);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <button className="heartBtn" onClick={HeartBtnHandler}>
        {btn}
      </button>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="heartWrapper">
      <div className={scrollY > 210 ? "fixed heart" : "heart"}>
        {loading ? <Loading /> : <HeartBtn />}
      </div>
    </div>
  );
}
