"use client";

import { useCommentCount } from "@/app/utils/useCustom";

export default function Comment({ parent }) {
  const { count, isLoading } = useCommentCount(parent);

  return (
    <div className="comment component">
      <span className="icon">💬</span>
      <span className="count">{isLoading ? "0" : count}</span>
    </div>
  );
}
