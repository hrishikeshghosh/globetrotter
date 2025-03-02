/**
 * API Route: GET /api/reset-questions
 * 
 * Description:
 * This API serves to reset the cookie state that stroes the previously asked questions
 * It ensures that the user can restart the game successfully.
 * 
 * Response:
 * - 200 OK: { message: string } 
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();

    // Remove the seen_questions cookie
    (await cookieStore).set("seen_questions", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0, // Expire immediately
    });

    return NextResponse.json({ message: "Session reset. Questions will start over." });
}
