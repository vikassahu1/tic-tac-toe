import { NextRequest, NextResponse } from "next/server";
import { play } from "@/packages/jev/play";


export async function POST(request: NextRequest) {
    const { roundState, playerInfo } = await request.json();
    const position = await play(roundState, playerInfo);
    return NextResponse.json({ position });
}