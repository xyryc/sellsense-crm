"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/profile" });
}
export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}

export async function doCredentialsLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}
