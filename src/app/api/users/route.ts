import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
export const GET = async function () {
  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 401 });
  }

  return NextResponse.json({ userEmail: user.primaryEmail });
};
