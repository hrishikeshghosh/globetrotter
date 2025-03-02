/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * API Route: GET /api/get-trivia
 * 
 * Description:
 * This API serves random trivias from the dataset stored in 'server/datasets/destinations.json'.
 * 
 * Response:
 * - 200 OK: { clue: string }
 * - 500 Internal Server Error: { error: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Helper function to shuffle an array
function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function GET(request: NextRequest) {
    try {
        // Extract the index from the query parameters
        const { searchParams } = new URL(request.url);
        const index = searchParams.get('index');
        const parsedIndex = Number(index)

        if (!index || isNaN(parsedIndex)) {
            return NextResponse.json({ error: 'Invalid index provided' }, { status: 400 });
        }

        // Load the dataset
        const filePath = path.join(process.cwd(), 'server', 'datasets', 'destinations.json');
        const data = fs.readFileSync(filePath, 'utf8');
        const destinations = JSON.parse(data);

        // Validate the index
        if (parsedIndex < 0 || index >= destinations.length) {
            return NextResponse.json({ error: 'Index out of range' }, { status: 400 });
        }

        // Get the destination at the specified index
        const destination = destinations[index];

        // Combine trivia and fun_fact arrays
        const combined = [...destination.trivia, ...destination.fun_fact];

        // Shuffle the combined array
        const shuffled = shuffleArray(combined);

        // Select one trivia and one fun_fact
        const trivia = shuffled.find(item => destination.trivia.includes(item));
        const funFact = shuffled.find(item => destination.fun_fact.includes(item));

        // Return the response
        return NextResponse.json({ trivia, funFact });
    } catch (error) {
        console.error('Error fetching destination data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}