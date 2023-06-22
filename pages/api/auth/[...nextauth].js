import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { assignRole } from "./signup";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      // 1. 로그인 페이지 폼 자동 생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 2. 로그인 요청 시 실행되는 코드
      async authorize(credentials) {
        /* 직접 DB에서 아이디, 비번 비교하고
         아이디, 비번 맞으면 return 결과, 틀리면 return null */
        const db = (await connectDB).db("forum");
        const user = await db
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

  // 3. jwt 만료일설정
  session: {
    strategy: "jwt", // "jwt" 명시 필수
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  callbacks: {
    // 4. jwt 만들 때 실행되는 코드
    jwt: async ({ token, user }) => {
      /* user: DB에서 조회한 유저 정보,
         token.user에 정보 저장하면 jwt에 들어감 */
      if (user) {
        token.user = {};
        token.user.id = user._id; // (소셜로그인 시 없는 값)
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role; // (소셜로그인 시 없는 값)
        // cf. 소셜로그인 시 없는 값은 추가되지 않음
      }

      return token;
    },
    // 5. 유저 세션이 조회될 때마다 실행되는 코드
    session: async ({ session, token }) => {
      /* cf. [소셜로그인 시 console.log(token)]
         name: 'LimEunSang',
         email: 'dmstkd2905@naver.com',
         picture: 'https://avatars.githubusercontent.com/u/86942472?v=4',
         sub: '644bd50f7c1c9593aaf25dca',
         user: { name: 'LimEunSang', email: 'dmstkd2905@naver.com' },
         iat: 1682993739,
         exp: 1685585739,
         jti: '0c477516-2be2-4d28-83e7-547ccb1bad68' */

      // 컴포넌트 안에서 보여줄 유저 정보
      session.user = token.user; // 토큰에 있는 모든 정보를 유저에게 전송

      // 소셜로그인 session에 id 정보 추가
      if (!session.user.id) session.user.id = token.sub;

      // 소셜로그인 session에 role 정보 추가
      if (!session.user.role) assignRole(session.user);

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
