"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action") as string | undefined;

  if (!action) throw new Error("Invalid action provided");

  await signIn(action, { redirectTo: "/profile" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}

export async function doCredentialsLogin(formData: FormData) {
  try {
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
