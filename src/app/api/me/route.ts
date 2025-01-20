// get user information from the request
import { NextRequest, NextResponse } from "next/server";
import { getUser, getUserIdByEmail } from "../../../utils/handler/functions";
import { ObjectId } from "mongodb";
import dbConnect from "../../../utils/db";
import { stackServerApp } from "@/stack";

// function to handle GET request to get user information
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user_email = req.headers.get("x-user-email");
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    // Get the user's id using the email

    const _id: string = await getUserIdByEmail(user_email);
    console.log("_id", _id);
    if (!_id) {
      return new NextResponse("User not found", { status: 404 });
    }

    // console.log('Request ID:', _id);
    // const _id = "677cff43a527bafc5d8b7280";
    // Get the user information
    const user_info = await getUser(_id);
    // console.log('User information:', user_info);

    return NextResponse.json(user_info, { status: 200 });
  } catch (error: any) {
    // Return an error if the user information could not be retrieved
    console.error("Error getting user information:", error);
    return NextResponse.json(
      { error: "Failed to get user information", details: error.message },
      { status: 500 }
    );
  }
}
