// src/app/api/add-pet/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const petName = searchParams.get("petName");
  const ownerName = searchParams.get("ownerName");

  try {
    if (!petName || !ownerName) throw new Error("Pet and owner names required");

    // Execute SQL query to insert pet into the database
    await query("INSERT INTO Pets (Name, Owner) VALUES ($1, $2)", [
      petName,
      ownerName,
    ]);
  } catch (error: unknown) {
    // Explicitly specify the type of 'error'
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }

  try {
    // Execute SQL query to fetch all pets from the database
    const pets = await query("SELECT * FROM Pets", []); // Pass an empty array as 'params'
    return NextResponse.json({ pets: pets.rows }, { status: 200 });
  } catch (error: unknown) {
    // Explicitly specify the type of 'error'
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Use this format to add pet and owner names to the db
// http://localhost:3000/api/add-pet?petName=YourPetName&ownerName=YourOwnerName
