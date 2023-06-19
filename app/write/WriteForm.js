"use client";

import { useState, useEffect, useRef } from "react";

export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [src, setSrc] = useState(""); // 미리보기 source
  const [imgURL, setImgURL] = useState(""); // img 저장 서버 경로
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* file 업로드 버튼 customizing */
  const fileRef = useRef(null);
  const handleClick = () => {
    fileRef.current.click();
  };

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
        if (response.status == 200) window.location.replace("/");
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
    <div className="writeForm">
      <input
        className="titleInput"
        name="title"
        placeholder="제목을 입력하세요"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        className="contentInput"
        name="content"
        placeholder="당신의 이야기를 펼쳐보세요..."
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <input
        id="imgFileInput"
        ref={fileRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          if (e.target.files[0]) setSrc(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <div className="uploadFileWrapper">
        <button className="uncommonBtn" onClick={handleClick}>
          📷&nbsp;&nbsp;이미지 업로드
        </button>
        {file && (
          <span style={{ marginLeft: "10px", display: "inline" }}>
            {file.name}
          </span>
        )}
      </div>
      <div className="imgWrapper">{file && <img src={src} />}</div>
      <div className="btnWrapper">
        <button
          className="commonBtn"
          onClick={handleSubmit}
          style={{ cursor: loading && "wait" }}
        >
          출간하기
        </button>
      </div>
    </div>
  );
}
