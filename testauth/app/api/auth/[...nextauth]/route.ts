// This route contains the authentication logic
// For the credential provider jwt must be used
// Other providers can be used to log in with other services

import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // The settings in the provider define the login form and authentication logic
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === process.env.LOGIN_EMAIL &&
          credentials?.password === process.env.LOGIN_PASSWORD
        ) {
          const user = {
            id: "1",
            name: "Admin",
            email: "admin@admin.com",
            customInfo: "This is a custom property",
          };
          return user;
        }
        return null;
      },
    }),
  ],
  // This is only needed if you want to add additional info to the session or jwt
  // In this case I'm adding an additional propery called customInfo
  // To just use id, name, and email you can omit the whole callbacks section
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          customInfo: token.customInfo,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          customInfo: u.customInfo,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
