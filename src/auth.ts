import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/users";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials exist and contain valid data
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials provided.");
        }

        try {
          const user = getUserByEmail(credentials.email);

          if (user) {
            const isMatch = user.password === credentials.password;

            if (isMatch) {
              return user;
            } else {
              throw new Error("Invalid Email or Password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : String(error)
          );
        }
      },
    }),
  ],
});
