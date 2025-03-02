/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * API Route: GET /api/get-question
 * 
 * Description:
 * This API serves random clues from the dataset stored in 'server/datasets/destinations.json'.
 * It ensures that no clue is repeated until all available clues have been used.
 * Once all clues are exhausted, the cache resets to start a new cycle.
 * Additionally, it returns four random city names without duplicates in a single response.
 * 
 * Response:
 * - 200 OK: { clue: string }
 * - 500 Internal Server Error: { error: string }
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "server/datasets/destinations.json");

export async function GET() {
    try {
        // Reading Data
        const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
        const cookieStore = cookies();
        const seenQuestions = (await cookieStore).get("seen_questions");

        // Parse stored questions from cookies (if any)
        const seenIndexes = seenQuestions ? JSON.parse(seenQuestions.value) : [];

        // Find the next available question
        const nextIndex = data.findIndex((_: any, i: number) => !seenIndexes.includes(i));

        if (nextIndex === -1) {
            return NextResponse.json({ error: "No more questions" }, { status: 404 });
        }

        // Add new question index to seen list
        seenIndexes.push(nextIndex);

        // Update cookies to store seen questions
        (await cookieStore).set("seen_questions", JSON.stringify(seenIndexes), {
            httpOnly: true,
            path: "/",
            maxAge: 120 // cookie lives for 2 minutes
        });

        // Extract current question
        const currentQuestion = data[nextIndex];

        // Select 2 random wrong city names
        const otherCities = data
            .filter((_: any, i: number) => i !== nextIndex)
            .map((destination: any) => destination.city);

        const shuffledOptions = [...otherCities.sort(() => 0.5 - Math.random()).slice(0, 2), currentQuestion.city];

        // Shuffle the options
        const finalOptions = shuffledOptions.sort(() => 0.5 - Math.random());

        return NextResponse.json({
            question: {
                questionIdx: nextIndex,
                clue: currentQuestion.clues[0], // Send only 1 clue
                city: currentQuestion.city
            },
            options: finalOptions
        });

    } catch {
        return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
    }
}
