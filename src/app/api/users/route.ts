// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { addUser } from "../../../utils/handler/functions";
import dbConnect from "../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("Request Body:", body);

    const newUser = await addUser(body);
    console.log("User Created:", newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to add user", details: error.message },
      { status: 500 }
    );
  }
}
