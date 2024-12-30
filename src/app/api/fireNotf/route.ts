import { stackServerApp } from "@/stack";
import { sendNotification } from "@/utils/notifications";
import { NextResponse } from "next/server";
export async function GET() {
  const user = await stackServerApp.getUser();
  if (!user || !user.primaryEmail) {
    return new NextResponse("User not found or email not available", {
      status: 404,
    });
  }
  const { primaryEmail } = user;
  sendNotification(primaryEmail, primaryEmail);
  return new NextResponse("Jelly Good", {
    status: 200,
  });
}
