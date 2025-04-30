import NextAuth, {
  getServerSession,
  NextAuthOptions,
  Session,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "./env";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
};

export const getSession = async () => {
  return getServerSession(nextAuthOptions) as Promise<Session>;
};
