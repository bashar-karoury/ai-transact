import { stackServerApp } from "@/stack";
import { getNNN } from "@/utils/handler/functions";
import { addClient, removeClient } from "@/utils/newNumberOfNotifications";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user_email = req.headers.get("x-user-email");
  if (!user_email) {
    return new NextResponse("User email not found", { status: 400 });
  }
  const stream = new ReadableStream({
    async start(controller) {
      addClient(user_email, controller);
      // send initial nnn
      try {
        const nnn = await getNNN(user_email);
        // console.log("nnn to be sent", Number(nnn));
        controller.enqueue(`data: ${JSON.stringify(nnn)}\n\n`);
      } catch (error) {
        console.log(error);
      }
      // console.log("/api/nnn-events connection is established");

      // Clean up when the connection is closed
      req.signal.addEventListener("abort", () => {
        removeClient(user_email);
        controller.close();
        // console.log("/api/nnn-events connection is closed");
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
