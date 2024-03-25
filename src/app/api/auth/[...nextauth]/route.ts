import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { query } from "@/lib/db";
import utc from "time-stamp";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("Login Attempt: ", credentials);
        try {
          // Fetch user from db by email
          const response = await query(
            "SELECT * FROM users WHERE user_email = $1",
            [credentials?.email]
          );

          const user_data = response.rows[0];
          const user = { id: user_data.user_id, email: user_data.user_email };

          if (user) {
            // Compare passwords
            const passwordCorrect = await compare(
              credentials?.password || "",
              user_data.user_password
            );

            if (passwordCorrect) {
              console.log("Login Success: ", user);

              // Return user object if password is correct
              return user;
            } else {
              throw new Error("Invalid password");
            }
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
          }
        } catch (error) {
          // Handle errors appropriately
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
