import getNotificationsNumber from "@/utils/notifications";
import { NextResponse } from "next/server";

export async function GET() {
  const noNotify = await getNotificationsNumber();
  console.log("notifications now ", noNotify);
  return new NextResponse(JSON.stringify({ notifications: noNotify }), {
    status: 200,
  });
}
