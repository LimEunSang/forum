"use client";

import { useEffect, useState } from "react";

export default function Heart({ parent }) {
  const [loading, setLoading] = useState(true);
  const [isHeart, setIsHeart] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const getData = () => {
    fetch(`/api/heart/list?parent=${parent}`)
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
        if (data) setIsHeart(true);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleScroll = () => {
    setScrollY(window.pageYOffset); // scroll 값 저장
  };

  // scroll 값을 실시간 감시
  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", handleScroll);
      // addEventListener: scroll 행위 여부 판단
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // eventlistener을 삭제해줘야 스크롤 할 때 2, 3번씩 렌더되지 않음
    };
  });

  // cf. scroll 시 fix - https://wazacs.tistory.com/28, https://wazacs.tistory.com/30

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="heartWrapper">
      <div className={scrollY > 210 ? "fixed heart" : "heart"}>
        {loading && <p>loading..</p>}
        {!loading && isHeart && (
          <button
            className="heartBtn"
            onClick={() => {
              fetch("/api/heart/delete", { method: "DELETE", body: parent })
                .then((response) => {
                  if (response.status == 200) {
                    setIsHeart(!isHeart);
                    return response.json();
                  } else {
                    return response.json().then((error) => {
                      throw new Error(error.error);
                    });
                  }
                })
                .then((data) => {
                  // console.log(data);
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            💖
          </button>
        )}
        {!loading && !isHeart && (
          <button
            className="heartBtn"
            onClick={() => {
              fetch("/api/heart/new", { method: "POST", body: parent })
                .then((response) => {
                  if (response.status == 200) {
                    setIsHeart(!isHeart);
                    return response.json();
                  } else {
                    return response.json().then((error) => {
                      throw new Error(error.error);
                    });
                  }
                })
                .then((data) => {
                  // console.log(data);
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            🤍
          </button>
        )}
      </div>
    </div>
  );
}
