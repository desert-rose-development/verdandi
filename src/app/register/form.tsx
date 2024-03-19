'use client'

import { FormEvent } from "react";
import { useRouter } from "next/navigation";


export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log("Registration Attempt -", "Email: ", formData.get('email'), "Username:", formData.get('username'))
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        });
        console.log({ response });
        if (response) {
            router.push("/login");
            router.refresh();
          }
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input name="username" className="border border-black text-black" type="username" />
            <input name="email" className="border border-black text-black" type="email" />
            <input name="password" className="border border-black text-black" type="password" />
            <button type="submit">Register</button>
        </form>
    )
}