import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers

  //   GOOGLE_ID=1056410802113-9rmppeacvjr7cni8vc3nvi0ea7vhgok0.apps.googleusercontent.com
  //   GOOGLE_SECRET=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

  providers: [
    GoogleProvider({
      clientId:
        "1056410802113-9rmppeacvjr7cni8vc3nvi0ea7vhgok0.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
};
