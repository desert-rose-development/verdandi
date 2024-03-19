// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare, hash } from "bcrypt";
// import { query } from "@/lib/db";

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         try {
//           //fetch user from db by email
//           const response = await query(
//             "SELECT * FROM users WHERE user_email= $1",
//             [credentials?.email]
//           );

//           const user = response.rows[0];

//           if (!user) {
//             throw new Error("User not found");
//           }

//           const user_id = user.user_id;
//           const email = user.user_email;
//           const display_name = user.user_display_name;
//           const timestamp = require("time-stamp");

//           //compare passwords
//           const passwordCorrect = await compare(
//             credentials?.password || "",
//             user.user_password
//           );

//           console.log(timestamp.utc("[YYYY/MM/DD-mm:ss]"));
//           console.log({ passwordCorrect, user_id, display_name, email });

//           if (passwordCorrect) {
//             //return user object if password is correct
//             return {
//               id: user.user_id,
//               email: user.user_email,
//             };
//           } else {
//             throw new Error("Invalid password");
//           }
//         } catch (error) {
//           console.error("Authentication error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
// });

// export { handler as GET, handler as POST };

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
              return user
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
