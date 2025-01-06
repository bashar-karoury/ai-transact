import { stackServerApp } from "@/stack";
import {
  clearNotifications,
  getNotifications,
} from "@/utils/handler/functions";
import { addClient, removeClient } from "@/utils/newNotifications";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await stackServerApp.getUser();
  if (!user || !user.primaryEmail) {
    return new NextResponse("User not found or email not available", {
      status: 404,
    });
  }
  const { primaryEmail } = user;
  // console.log("email = ", primaryEmail);
  const stream = new ReadableStream({
    async start(controller) {
      addClient(primaryEmail, controller);
      //
      const newNotificationList = await getNotifications(primaryEmail);
      // const newNotificationList = [
      //   {
      //     id: 1,
      //     message: 'Notification One: You have a new transaction "Fast Food"',
      //     date: "Date",
      //   },
      //   {
      //     id: 2,
      //     message: 'Notification Two: You have a new transaction "Groceries"',
      //     date: "Date",
      //   },
      //   {
      //     id: 3,
      //     message: 'Notification Three: You have a new transaction "Gas"',
      //     date: "Date",
      //   },
      // ];
      controller.enqueue(`data: ${JSON.stringify(newNotificationList)}\n\n`);
      // Clean up when the connection is closed
      req.signal.addEventListener("abort", async () => {
        removeClient(primaryEmail);
        controller.close();
        console.log("Connection from client is closed CLEANUP");
        await clearNotifications(primaryEmail);
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
