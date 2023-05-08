"use client";

import { useState } from "react";

export default function WriteForm() {
  let [src, setSrc] = useState("");

  return (
    <div className="p-20">
      <h4>글 작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글 제목" />
        <input name="content" placeholder="글 내용" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            let res = await fetch(`/api/post/image?file=${filename}`);
            res = await res.json();

            // S3 업로드
            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            res = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            console.log(res);

            if (res.ok) {
              setSrc(res.url + "/" + filename);
            } else {
              console.log("실패");
            }
          }}
        />
        <img src={src} />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
