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
                body: object._id,
              })
                .then((result) => {
                  if (result.status == 200) {
                    return result.json();
                  } else {
                    //서버가 에러 코드 전송 시 실행할 코드
                  }
                })
                .then((result) => {
                  //성공 시 실행할 코드
                  console.log(result);
                })
                .catch((error) => {
                  //인터넷 문제 등으로 실패 시 실행할 코드
                  console.log(error);
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
