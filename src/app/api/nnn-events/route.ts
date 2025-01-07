import { stackServerApp } from "@/stack";
import { getNNN } from "@/utils/handler/functions";
import { addClient, removeClient } from "@/utils/newNumberOfNotifications";
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
      // send initial nnn
      try {
        const nnn = await getNNN(primaryEmail);
        console.log("nnn to be sent", Number(nnn));
        if (Number(nnn)) {
          controller.enqueue(`data: ${JSON.stringify(nnn)}\n\n`);
        }
      } catch (error) {
        console.log(error);
      }
      console.log("/api/nnn-events connection is established");

      // Clean up when the connection is closed
      req.signal.addEventListener("abort", () => {
        removeClient(primaryEmail);
        controller.close();
        console.log("/api/nnn-events connection is closed");
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
