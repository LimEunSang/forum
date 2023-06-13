"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode({ mode }) {
  let router = useRouter();

  const modeBtnHandler = () => {
    const opposite = mode === "dark" ? "light" : "dark";
    document.cookie = `mode=${opposite}; max-age=` + 3600 * 24 * 400;
    router.refresh();
  };

  useEffect(() => {
    if (!mode) {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);

  return <span onClick={modeBtnHandler}>{mode === "dark" ? "🌙" : "☀️"}</span>;
}
