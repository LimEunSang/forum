"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { timeForToday } from "../utils/timeForToday";

const PostList = ({ result, user }) => {
  const router = useRouter();

  return (
    <div className="postList">
      {result.map((object, key) => (
        <div className="postItem" key={key}>
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
            {(user.role == "admin" || user.email == object.author.email) && (
              <div className="iconBtnBox">
                <Link prefetch={false} href={"/edit/" + object._id}>
                  📝
                </Link>
                <span
                  className="iconBtn"
                  onClick={(e) => {
                    // s3 서버 업로드 된 이미지 삭제
                    // 단, 이미지가 등록됐을 때만 실행
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
                          return response.json();
                        } else {
                          return response.json().then((error) => {
                            throw new Error(error.error);
                          });
                        }
                      })
                      .then((data) => {
                        e.target.parentElement.parentElement.parentElement.style.opacity = 0;
                        setTimeout(() => {
                          e.target.parentElement.parentElement.parentElement.style.display =
                            "none";
                        }, 1000);
                      })
                      .catch((error) => {
                        alert(error.message);
                      });
                  }}
                >
                  🗑️
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
