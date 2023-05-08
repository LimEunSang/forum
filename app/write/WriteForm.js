"use client";

import { useState } from "react";

export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [src, setSrc] = useState(""); // 미리보기 source
  const [imgURL, setImgURL] = useState(""); // img 저장 서버 경로
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        // 비동기 함수의 실행 속도로 인하여 하단 글 작성 비동기 코드가 늦게 실행
        // 따라서 작성 버튼 한번 클릭 시 이미지를 업로드하고 두 번째 눌러야 글 작성
        if (!imgURL)
          alert(
            "서버에 이미지가 업로드 되었습니다. 다시 한번 작성 버튼을 눌러주세요."
          );
      } else {
        console.log("이미지 서버 업로드 실패");
      }
    }

    // 글 작성
    if (!file || imgURL)
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
          setSrc(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <img src={src} />
      <button onClick={handleSubmit}>작성</button>
    </div>
  );
}
