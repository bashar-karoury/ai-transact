import { stackServerApp } from "@/stack";
import { sendNotification } from "@/utils/NotificationManager";
import { NextResponse } from "next/server";
export async function GET() {
  const user = await stackServerApp.getUser();
  if (!user || !user.primaryEmail) {
    return new NextResponse("User not found or email not available", {
      status: 404,
    });
  }
  const { primaryEmail } = user;
  sendNotification(primaryEmail, "You have a new notification");
  // sendNotification(primaryEmail, "2");
  return new NextResponse("Jelly Good", {
    status: 200,
  });
}
