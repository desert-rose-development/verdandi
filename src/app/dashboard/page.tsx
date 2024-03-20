import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div>private dashboard page - you need to be logged in to view this</div>
  );
}
