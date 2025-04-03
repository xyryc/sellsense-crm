import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session) return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/",
    "/contacts",
    "/customers",
    "/orders",
    "/payments",
    "/products",
    "/referral",
    "/suppliers",
    "/profile",
    "/loyalty",
  ],
};
