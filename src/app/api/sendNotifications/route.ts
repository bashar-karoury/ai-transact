import { stackServerApp } from "@/stack";
import { sendNotification } from "@/utils/newNotifications";
import { NextResponse } from "next/server";
export async function GET() {
  const user = await stackServerApp.getUser();
  if (!user || !user.primaryEmail) {
    return new NextResponse("User not found or email not available", {
      status: 404,
    });
  }
  const { primaryEmail } = user;

  const notifications = [
    {
      id: 1,
      message: 'Notification One: You have a new transaction "Fast Food"',
      date: "Date",
    },
    {
      id: 2,
      message: 'Notification Two: You have a new transaction "Groceries"',
      date: "Date",
    },
    {
      id: 3,
      message: 'Notification Three: You have a new transaction "Gas"',
      date: "Date",
    },
  ];
  sendNotification(primaryEmail, JSON.stringify(notifications));
  return new NextResponse("Jelly Good", {
    status: 200,
  });
}
