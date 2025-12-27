"use server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function registerAdmin(formData) {
  await dbConnect();
  
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin"
  });

  revalidatePath("/dashboard/onboard");
  return { success: "Admin onboarded successfully!" };
}