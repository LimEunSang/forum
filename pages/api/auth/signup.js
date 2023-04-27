import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(request, response) {
  if (request.method == "POST") {
    // 이름, 이메일, 비밀번호 입력 란에 빈칸을 보내는 경우 가입 거절
    if (
      request.body.name == "" ||
      request.body.email == "" ||
      request.body.password == ""
    ) {
      return response
        .status(500)
        .json("이름/이메일/비밀번호는 빈 문자열일 수 없습니다");
    }

    const client = await connectDB;
    const db = client.db("forum");

    // 이메일 중복 체크
    let result = await db.collection("post").find().toArray();
    result.map((post) => {
      if (post.email == request.body.email) {
        return response.status(500).json("이미 존재하는 이메일입니다");
      }
    });

    let hash = await bcrypt.hash(request.body.password, 10);
    request.body.password = hash;

    const adminEmailList = ["dmstkd2905@naver.com", "dmstkd2905@gmail.com"];
    if (adminEmailList.includes(request.body.email)) {
      request.body.role = "admin";
    } else {
      request.body.role = "normal";
    }

    await db.collection("user_cred").insertOne(request.body);

    return response.status(200).json({ message: "회원가입 완료" });
  }
}
