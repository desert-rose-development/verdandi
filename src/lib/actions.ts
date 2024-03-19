"use server";

import { getServerSession as _getServerSession } from "next-auth/next";
import { cookies, headers } from "next/headers";

import { GET } from "@/app/api/auth/[...nextauth]/route";

export default function getServerSession() {
  return _getServerSession(
    GET(
      {
        headers: headers(),
        cookies: cookies(),
      } as any,
      { params: { nextauth: ["session"] } }
    )[2]
  );
}

 