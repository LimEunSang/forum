"use client";

import { useState, useEffect } from "react";

export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [src, setSrc] = useState(""); // 미리보기 source
  const [imgURL, setImgURL] = useState(""); // img 저장 서버 경로
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const assignPost = () => {
    fetch("/api/post/new", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
        imgURL: imgURL,
      }),
    })
      .then((response) => {
        if (response.status == 200) window.location.replace("/list");
      })
      .catch((error) => alert(error));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // 파일 업로드
    if (file) {
      let filename = encodeURIComponent(file.name);
      let res = await fetch(`/api/post/image?file=${filename}`);
      res = await res.json();

      const formData = new FormData();
      Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      res = await fetch(res.url, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setImgURL(res.url + "/" + filename);
        // 이 자리에 assignPost()를 넣으면 setImgURL()가 완료되기 전에 실행됨
      } else {
        console.log("이미지 서버 업로드 실패");
      }
    }

    if (!file) assignPost();

    setLoading(false);
  };

  // setImgURL()가 정상적으로 완료된 이후에 assignPost() 실행
  useEffect(() => {
    if (imgURL) {
      assignPost();
    }
  }, [imgURL]);

  return (
    <div className="p-20">
      <h4>글 작성</h4>
      <input
        name="title"
        placeholder="글 제목"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        name="content"
        placeholder="글 내용"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          if (e.target.files[0]) setSrc(URL.createObjectURL(e.target.files[0]));
        }}
      />
      {file && <img src={src} />}
      <button
        onClick={handleSubmit}
        style={{ cursor: loading ? "wait" : "default" }}
      >
        작성
      </button>
    </div>
  );
}
