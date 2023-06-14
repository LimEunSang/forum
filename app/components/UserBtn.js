"use client";

import { useState } from "react";
import LogoutBtn from "./LogoutBtn";

export default function UserBtn({ userName }) {
  const [activate, setActivate] = useState(false);

  return (
    <span className="userBtn">
      <span
        className="user"
        onClick={() => {
          setActivate(!activate);
        }}
      >
        {userName}
        <span className="arrow">▼</span>
      </span>
      <div className="userMenu">{activate && <LogoutBtn />}</div>
    </span>
  );
}
