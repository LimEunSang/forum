import Link from "next/link";
import LoginBtn from "./LoginBtn";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutBtn from "./LogoutBtn";
import DarkMode from "./DarkMode";
import { cookies } from "next/headers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

  let mode = cookies().get("mode");

  return (
    <html lang="en">
      <body
        className={mode && mode.value == "dark" ? "dark-mode" : "light-mode"}
      >
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          {session ? (
            <>
              {session.user.name}
              <LogoutBtn />
            </>
          ) : (
            <>
              <Link href="/register">Register</Link>
              <LoginBtn />
            </>
          )}
          <DarkMode />
        </div>
        {children}
      </body>
    </html>
  );
}
