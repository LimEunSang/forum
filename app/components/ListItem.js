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
            onClick={(e) => {
              fetch("/api/post/delete/" + object._id, {
                method: "DELETE",
              })
                .then((response) => {
                  if (response.status == 200) {
                    return response.json();
                  } else {
                    return response.json().then((error) => {
                      throw new Error(error.error);
                    });
                  }
                })
                .then((data) => {
                  // 성공 시 실행할 코드
                  e.target.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 1000);
                })
                .catch((error) => {
                  // 실패 시 실행할 코드
                  alert(error.message);
                });
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
