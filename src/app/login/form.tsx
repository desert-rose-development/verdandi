// 'use client'

// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { FormEvent } from "react";
// // import { hash } from "bcrypt";
// // import bcrypt from 'bcryptjs';



// export default function Form() {
//     const router = useRouter();
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);


//         const response = await signIn('credentials', {
//             email: formData.get('email'),
//             password: formData.get('password'),
//             redirect: false,
//         });
//         console.log({ response });
//         if(!response?.error){
//             router.push('/');
//             router.refresh();
//         }
//     };
//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
//             <input name="email" className="border border-black text-black" type="email" />
//             <input name="password" className="border border-black text-black" type="password" />
//             <button type="submit">Login</button>
//         </form>
//     )
// }
'use client'

import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";


export default function Form() {
    const { register } = useForm();


    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        console.log("Login Attempt")
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
        // Sign in with NextAuth
        const result = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard"
        });

        // Check if the login was successful
        if (result?.error) {
            // Handle login error
            console.error("Login failed:", result.error);
        } else {
            console.log("Login successful");
            
        }
        } catch (error) {
        console.error("An error occurred during login:", error);
        }
    };

    return (
        <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 mx-auto max-w-md mt-10"
        >
        <input
            type="email"
            // name="email"
            placeholder="Email"
            className="border border-black text-black"
            required
            {...register('email')}
        />
        <input
            type="password"
            // name="password"
            placeholder="Password"
            className="border border-black text-black"
            required
            {...register('password')}
        />
        <button type="submit">Login</button>
        </form>
    );
}