import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

// 회원 정보에 role 추가하는 함수
export const assignRole = (object) => {
  const adminList = ["dmstkd2905@naver.com", "dmstkd2905@gmail.com"]; // 관리자 email list
  /* 관리자 email list에 해당하는 email일 경우 role = admin
     해당하지 않을 경우 role = normal */
  if (adminList.includes(object.email)) {
    object.role = "admin";
  } else {
    object.role = "normal";
  }
};

export default async function handler(request, response) {
  if (request.method == "POST") {
    try {
      if (!request.body.name || !request.body.email || !request.body.password) {
        return response.send(
          "<script>alert('Error: empty content'); window.location.replace('/register');</script>"
        );
      }

      const client = await connectDB;
      const db = client.db("forum");

      // 중복 이메일 검사
      const result = await db
        .collection("user_cred")
        .findOne({ email: request.body.email });

      if (result) {
        return response.send(
          "<script>alert('Error: email duplication'); window.location.replace('/register');</script>"
        );
      }

      const hash = await bcrypt.hash(request.body.password, 10);
      request.body.password = hash;

      assignRole(request.body);

      await db.collection("user_cred").insertOne(request.body);

      return response.send(
        "<script>alert('Complete registration'); window.location.replace('/');</script>"
      );
    } catch {
      return response.send(
        "<script>alert('Error: server error'); window.location.replace('/register');</script>"
      );
    }
  }
}
