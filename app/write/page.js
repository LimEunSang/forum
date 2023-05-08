import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import WriteForm from "./WriteForm";

export default async function Write() {
  let session = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인 후 이용 가능합니다</div>;
  } else {
    return <WriteForm />;
  }
}
