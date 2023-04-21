"use client";

import Link from "next/link";

const ListItem = ({ result }) => {
  return (
    <div>
      {result.map((object, key) => (
        <div className="list-item" key={key}>
          <Link prefetch={false} href={"/detail/" + object._id}>
            <h4>{object.title}</h4>
          </Link>
          <Link prefetch={false} href={"/edit/" + object._id}>
            📝
          </Link>
          <span
            onClick={() => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: JSON.stringify({ _id: object._id }),
              }).then(() => {});
            }}
          >
            🗑️
          </span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
