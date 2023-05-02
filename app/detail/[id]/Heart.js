"use client";

import { useEffect, useState } from "react";

export default function Heart({ parent }) {
  const [loading, setLoading] = useState(true);
  const [isHeart, setIsHeart] = useState(false);

  const getData = () => {
    fetch(`/api/heart/list?parent=${parent}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) setIsHeart(true);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <p>loading..</p>}
      {!loading && isHeart && (
        <button
          onClick={() => {
            fetch("/api/heart/delete", { method: "DELETE", body: parent })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // console.log(data);
                setIsHeart(!isHeart);
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
          onClick={() => {
            fetch("/api/heart/new", { method: "POST", body: parent })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // console.log(data);
                setIsHeart(!isHeart);
              })
              .catch((error) => {
                alert(error.message);
              });
          }}
        >
          🤍
        </button>
      )}
    </>
  );
}
