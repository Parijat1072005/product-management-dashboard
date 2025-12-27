import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // If the user is already logged in, send them to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Otherwise, send them to the login page
  redirect("/login");
}