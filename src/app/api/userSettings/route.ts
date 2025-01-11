// `PUT /userSettings`

// userSettings route

import dbConnect from "../../../utils/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUserIdByEmail,
  updateUserSettings,
  getUserSettings,
} from "../../../utils/handler/functions";
import { stackServerApp } from "@/stack";

// endpoint to get user settings
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user_email = "tester@testing.test";
    // const user_email = req.headers.get("x-user-email");
    console.log("User email:", user_email);
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    // Get the user's id using the email
    const _id: string = await getUserIdByEmail(user_email);

    if (!_id) {
      return new NextResponse("User not found", { status: 404 });
    }
    console.log("Request ID:", _id);

    // Fetch user settings using '_id'
    const userSettings = await getUserSettings(_id);
    console.log("User Settings:", userSettings);

    // Return the user settings
    return NextResponse.json(userSettings, { status: 200 });
  } catch (error: any) {
    // Return an error if the user settings could not be retrieved
    console.log("Error getting user settings:", error);
    return NextResponse.json(
      { error: "Failed to get user settings", details: error.message },
      { status: 500 }
    );
  }
}

// endpoint to update user settings
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const user_email = req.headers.get("x-user-email");
    console.log("User email:", user_email);
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    // Get the user's id using the email
    const _id: string = await getUserIdByEmail(user_email);

    if (!_id) {
      return new NextResponse("User not found", { status: 404 });
    }
    console.log("Request ID:", _id);

    // Get the body of the request
    const body = await req.json();
    console.log("Request Body:", body);

    const updatedUserSettings = await updateUserSettings(_id, body);
    console.log("Updated User Settings:", updatedUserSettings);

    return NextResponse.json(updatedUserSettings, { status: 200 });
  } catch (error: any) {
    console.log("Error updating user settings:", error);
    return NextResponse.json(
      { error: "Failed to update user settings", details: error.message },
      { status: 500 }
    );
  }
}
