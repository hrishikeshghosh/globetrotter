/**
 * API Route: POST /api/create-user
 * 
 * Description:
 * This API appends a new user entry with userId and score into 'server/datasets/users.json'.
 * 
 * Request Body:
 * - userName: string (required)
 * - ensures there is no duplicate usernames
 * 
 * Response:
 * - 200 OK: { message: "User added successfully" }
 * - 400 Bad Request: { error: "Invalid request body" }
 * - 409 Conflict: { error: "User already exists" }
 * - 500 Internal Server Error: { error: "Failed to save data" }
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface userType {
    userName: string
    maxScore: number
}

const usersFilePath = path.join(process.cwd(), "server/datasets/users.json");

export async function POST(req: Request) {
    try {
        const { userName } = await req.json();

        if (!userName) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        let usersData = [];
        if (fs.existsSync(usersFilePath)) {
            const fileContent = fs.readFileSync(usersFilePath, "utf-8").trim();
            usersData = fileContent ? JSON.parse(fileContent) : [];
        }

        if (usersData.some((user: userType) => user.userName === userName)) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        usersData.push({ userName, maxScore: 0 });
        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

        return NextResponse.json({ message: "User added successfully" });
    } catch (error) {
        console.log("err", error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}

