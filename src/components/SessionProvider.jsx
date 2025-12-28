"use client";
import { SessionProvider } from "next-auth/react";

// Change this to a default export
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}