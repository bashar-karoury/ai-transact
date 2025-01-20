import { stackServerApp } from "@/stack";
import {
  clearNotifications,
  getNotifications,
} from "@/utils/handler/functions";
import { addClient, removeClient } from "@/utils/newNotifications";
import { sendNotification as nnnSendNotification } from "@/utils/newNumberOfNotifications";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user_email = req.headers.get("x-user-email");
  if (!user_email) {
    return new NextResponse("User email not found", { status: 400 });
  }
  const stream = new ReadableStream({
    async start(controller) {
      addClient(user_email, controller);
      //
      const newNotificationList = await getNotifications(user_email);
      controller.enqueue(`data: ${JSON.stringify(newNotificationList)}\n\n`);
      // Clean up when the connection is closed
      req.signal.addEventListener("abort", async () => {
        removeClient(user_email);
        controller.close();
        // console.log("Connection from client is closed CLEANUP");
        await clearNotifications(user_email);
        nnnSendNotification(user_email, 0);
        // set Notificatins' new flag to false so they wont' be rendered again
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
