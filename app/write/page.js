import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import WriteForm from "./WriteForm";

export default async function Write() {
  const session = await getServerSession(authOptions);

  return session ? <WriteForm /> : <div>로그인 후 이용 가능합니다</div>;
}
