// import { getServerSession } from "next-auth";
// import Form from "./form";
// import { redirect } from "next/navigation";

// export default async function LoginPage() {
//   const session = await getServerSession();
//   if (session) {
//     redirect("/");
//   }
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-2 mx-auto max-w-md mt-10"
//     >
//       <input
//         name="email"
//         className="border border-black text-black"
//         type="email"
//       />
//       <input
//         name="password"
//         className="border border-black text-black"
//         type="password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

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

