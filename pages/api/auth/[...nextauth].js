import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "0421b75068333d8c946e",
      clientSecret: process.env.GITHUBPROVIDER_SECRET,
    }),
    CredentialsProvider({
      // 1. 로그인 페이지 폼 자동 생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 2. 로그인 요청 시 실행되는 코드
      // 직접 DB에서 아이디, 비번 비교하고
      // 아이디, 비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("forum");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });

        if (!user) {
          console.log("해당 이메일은 존재하지 않습니다");
          return null;
        }

        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!pwcheck) {
          console.log("비밀번호 오류");
          return null;
        }

        return user;
      },
    }),
  ],

  // 3. jwt 써놔야 잘 됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  callbacks: {
    // 4. jwt 만들 때 실행되는 코드
    // user 변수는 DB의 유저 정보 담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },
    // 5. 유저 세션이 조회될 때마다 실행되는 코드
    session: async ({ session, token }) => {
      // 컴포넌트 안에서 보여줄 유저 정보
      session.user = token.user; // 토큰에 있는 모든 정보를 유저에게 전송
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
