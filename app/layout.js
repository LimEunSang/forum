import "./globals.css";
import Link from "next/link";
import LoginBtn from "./components/LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import DarkModeBtn from "./components/DarkModeBtn";
import { cookies } from "next/headers";
import UserBtn from "./components/UserBtn";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

  let mode = cookies().get("mode");

  return (
    <html lang="en">
      <body className={mode && mode.value == "dark" ? "darkMode" : ""}>
        <div className="layout">
          <div className="container">
            <div className="header">
              <div className="logoBox">
                <Link className="logo" href="/">
                  Appleforum
                </Link>
              </div>
              <div className="mainMenu">
                <DarkModeBtn mode={mode && mode.value} />
                {session ? (
                  <>
                    <Link className="headerBtn writeBtn" href="/write">
                      새 글 작성
                    </Link>
                    <UserBtn userName={session.user.name} />
                  </>
                ) : (
                  <>
                    <Link className="headerBtn" href="/register">
                      회원가입
                    </Link>
                    <LoginBtn />
                  </>
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
