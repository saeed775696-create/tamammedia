import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "@/config/auth";
import { getClientIpFromHeaders, rateLimit } from "@/lib/api/rate-limit";

// Used for unknown and disabled accounts so authentication timing does not
// reveal whether an email address exists in the database.
const DUMMY_PASSWORD_HASH = "$2b$12$l0AGQlSrJtwI/2ksMmqsZudYVsN4E7SU52DDJ8wYgW61fTbv/3OTa";

export const authOptions: NextAuthOptions = {
  secret: authConfig.secret,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.trim().toLowerCase();
        const ip = getClientIpFromHeaders(request.headers ?? {});
        const [ipAllowed, credentialAllowed] = await Promise.all([
          rateLimit(`login:ip:${ip}`, { limit: 20, windowSeconds: 15 * 60 }),
          rateLimit(`login:credential:${ip}:${email}`, { limit: 8, windowSeconds: 15 * 60 }),
        ]);
        if (!ipAllowed || !credentialAllowed) return null;

        const user = await prisma.user.findUnique({
          where: { email },
        });
        const isValid = await bcrypt.compare(
          credentials.password,
          user?.isActive ? user.password : DUMMY_PASSWORD_HASH,
        );
        if (!user || !user.isActive || !isValid) return null;
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
          sessionVersion: user.sessionVersion,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.mustChangePassword = user.mustChangePassword;
        token.sessionVersion = user.sessionVersion;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.role = token.role as string;
        session.user.mustChangePassword = token.mustChangePassword === true;
        session.user.sessionVersion = token.sessionVersion as number | undefined;
      }
      return session;
    },
  },
};
