import { useFormState, useFormStatus } from "react-dom";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <Form />;
}
