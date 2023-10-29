"use client";

import Link from "next/link";
import $ from "jquery";
import { useRouter } from "next/navigation";
import { timeForToday } from "../utils/timeForToday";
import { canManage } from "@/app/utils/authCheck";

export default function PostItem({ item, session }) {
  const router = useRouter();

  return (
    <div className="postItem" id={item._id}>
      <div
        className="contentBox"
        onClick={() => {
          router.push("/detail/" + item._id);
        }}
      >
        {item.imgURL && (
          <img className="thumbnail" src={item.imgURL} alt="thumbnail" />
        )}
        <h4 className="title">{item.title}</h4>
      </div>
      <div className="infoBox">
        <div className="textBox">
          <span>{item.author.name}</span>
          <span> • </span>
          <span>{timeForToday(item.creationDate)}</span>
        </div>
        {canManage(session, item) && (
          <div className="iconBtnBox">
            <Link
              className="iconBtn"
              prefetch={false}
              href={"/edit/" + item._id}
            >
              📝
            </Link>
            <span
              className="iconBtn"
              onClick={(e) => {
                // s3 서버 업로드 된 이미지 삭제
                item.imgURL &&
                  fetch(`/api/post/image/?file=${item.imgURL}`, {
                    method: "DELETE",
                  });

                // 게시물 삭제
                fetch("/api/post/delete/" + item._id, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (response.status == 200) {
                      $(`#${item._id}`).css("opacity", "0");
                      setTimeout(() => {
                        $(`#${item._id}`).css("display", "none");
                      }, 1000);
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
