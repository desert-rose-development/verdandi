import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { query } from "@/lib/db";
import { error } from "console";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  try {
    // Parsing and logging the JSON body of the incoming request
    const { username, email, password } = await request.json();
    console.log({ username, email, password });

    // Hashing the password using bcrypt with a salt round of 10
    const hashedPassword = await hash(password, 10);

    // Executing a database query to insert the user data into the database
    const response = await query(
      "INSERT INTO users (user_display_name, user_email, user_password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
    if (response) {
      redirect("/login");
    }
  } catch (e) {
    // Catching and logging any errors that occur during the process
    console.log("Error registering user:", { e });
  }

  // Returning a JSON response indicating success
  return NextResponse.json({ message: "success" });
}
