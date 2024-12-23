import { NextResponse } from "next/server";

export const GET = function (){
    return NextResponse.json({users:5});
}