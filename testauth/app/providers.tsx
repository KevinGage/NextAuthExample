// This provider is used to wrap the app with the SessionProvider from next-auth/react
// This is required to use useSession hooks in client side components
// This allows client side components to view the session information

"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
