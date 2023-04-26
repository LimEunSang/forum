import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "0421b75068333d8c946e",
      clientSecret: "ada829504b5725583d986f609eca87ecdc4697b2",
    }),
  ],
  secret: "1111",
};

export default NextAuth(authOptions);
