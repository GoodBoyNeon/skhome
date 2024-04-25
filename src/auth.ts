import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export const { auth, signIn, signOut } = NextAuth({
  providers: [Google, Facebook],
});
