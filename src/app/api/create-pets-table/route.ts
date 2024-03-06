// api/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db"; // Import the query function from the db.ts file

export async function GET(request: Request) {
  try {
    // Execute your SQL query using the query function
    const result = await query(
      "CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );",
      []
    );
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
