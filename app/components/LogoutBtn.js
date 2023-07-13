"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <span
      className="userMenuItem"
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      로그아웃
    </span>
  );
}
