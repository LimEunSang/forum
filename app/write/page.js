import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import LoginBtn from "../LoginBtn";

export default async function Write() {
  let session = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인 후 이용 가능합니다</div>;
  } else {
    return (
      <div className="p-20">
        <h4>글 작성</h4>
        <form action="/api/post/new" method="POST">
          <input name="title" placeholder="글 제목" />
          <input name="content" placeholder="글 내용" />
          <button type="submit">버튼</button>
        </form>
      </div>
    );
  }
}
