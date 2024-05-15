import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";

import { env } from "~/env";
import { removeEmailDomain } from "~/lib/utils";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";
import type { Role } from "~/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    // ...other properties
    // role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    role: Role;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      const id = token.sub;
      if (!id) return token;

      const user = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, id),
      });

      if (!user) return token;

      token.role = user.role;
      token.username = user.username;
      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;

      return token;
    },
  },
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    sessionsTable: sessions,
    usersTable: users,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: removeEmailDomain(profile.email) ?? profile.email,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
