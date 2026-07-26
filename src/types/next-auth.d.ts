import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
      mustChangePassword?: boolean;
      sessionVersion?: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
    mustChangePassword?: boolean;
    sessionVersion?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    role?: string;
    mustChangePassword?: boolean;
    sessionVersion?: number;
  }
}
