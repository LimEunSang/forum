"use client";

import { useEffect, useState } from "react";
import Heart from "./Heart";
import Comment from "./Comment";

export default function Sidebar({ parent, session }) {
  /* scroll 시 fix - https://wazacs.tistory.com/28, https://wazacs.tistory.com/30 */
  const [scrollY, setScrollY] = useState(0);

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

  return (
    <div className="sidebar">
      <div className={scrollY > 210 ? "fixed wrapper" : "wrapper"}>
        <Heart parent={parent} session={session} />
        <Comment parent={parent} />
      </div>
    </div>
  );
}
