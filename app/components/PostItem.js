"use client";

import Link from "next/link";
import $ from "jquery";
import { useRouter } from "next/navigation";
import { timeForToday } from "../utils/timeForToday";

export default function PostItem({ object, user }) {
  const router = useRouter();

  const authorityCheck = () => {
    if (!user) return false;
    return user.role == "admin" || user.email == object.author.email;
  };

  return (
    <div className="postItem" id={object._id}>
      <div
        className="contentBox"
        onClick={() => {
          router.push("/detail/" + object._id);
        }}
      >
        {object.imgURL && (
          <img className="thumbnail" src={object.imgURL} alt="thumbnail" />
        )}
        <h4>{object.title}</h4>
      </div>
      <div className="infoBox">
        <div className="textBox">
          <span>{object.author.name}</span>
          <span>•</span>
          <span>{timeForToday(object.creationDate)}</span>
        </div>
        {authorityCheck() && (
          <div className="iconBtnBox">
            <Link
              className="iconBtn"
              prefetch={false}
              href={"/edit/" + object._id}
            >
              📝
            </Link>
            <span
              className="iconBtn"
              onClick={(e) => {
                // s3 서버 업로드 된 이미지 삭제
                object.imgURL &&
                  fetch(`/api/post/image/?file=${object.imgURL}`, {
                    method: "DELETE",
                  });

                // 게시물 삭제
                fetch("/api/post/delete/" + object._id, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (response.status == 200) {
                      $(`#${object._id}`).css("opacity", "0");
                      setTimeout(() => {
                        $(`#${object._id}`).css("display", "none");
                      }, 1000);
                      /* 위 코드 버그 발생.
                         이슈 #15 참조 */
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              🗑️
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
