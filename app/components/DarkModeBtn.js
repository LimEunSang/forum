"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkModeBtn({ mode }) {
  const router = useRouter();

  const modeBtnHandler = () => {
    const opposite = mode === "dark" ? "light" : "dark";
    document.cookie =
      `mode=${opposite}; max-age=` + 3600 * 24 * 400 + "; path=/";
    /* [path 설정 이유]
       path를 설정하지 않으면 각 페이지마다 다른 cookie가 생성되고,
       mode 기능이 동작하지 않을 수 있음 */
    router.refresh();
  };

  useEffect(() => {
    if (!mode) {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400 + "; path=/";
    }
  }, []);

  return (
    <span className="darkModeBtn" onClick={modeBtnHandler}>
      {mode === "dark" ? "🌙" : "☀️"}
    </span>
  );
}
