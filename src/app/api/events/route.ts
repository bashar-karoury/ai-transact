import { stackServerApp } from "@/stack";
import { addClient, removeClient } from "@/utils/notifications";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await stackServerApp.getUser();
  if (!user || !user.primaryEmail) {
    return new NextResponse("User not found or email not available", {
      status: 404,
    });
  }
  const { primaryEmail } = user;
  console.log("email = ", primaryEmail);
  const stream = new ReadableStream({
    start(controller) {
      addClient(primaryEmail, controller);

      // Clean up when the connection is closed
      req.signal.addEventListener("abort", () => {
        removeClient(primaryEmail);
        controller.close();
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
