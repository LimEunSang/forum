"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode() {
  let router = useRouter();

  useEffect(() => {
    let mode = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
    if (!mode) {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);

  return (
    <span
      onClick={() => {
        let mode = ("; " + document.cookie)
          .split(`; mode=`)
          .pop()
          .split(";")[0];
        if (mode == "light") {
          document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
        } else if (mode == "dark") {
          document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
        }
        router.refresh();
      }}
    >
      🌙
    </span>
  );
}
