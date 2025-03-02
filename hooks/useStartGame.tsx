/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface QuestionResponse {
    question: { clue: string; city: string, questionIdx: number };
    options: string[];
}

export interface triviaFace {
    trivia: triviaResponseType
    wasCorrectAnswer: boolean
}
interface triviaResponseType {
    trivia: string
    funFact: string
}

interface UseQuizGameReturn {
    clue: string;
    correctAnswer: string;
    options: string[];
    score: number;
    timer: number;
    isLoading: boolean;
    isTriviaLoading: boolean
    isGameOver: boolean;
    submitAnswer: (selectedOption: string, questionIdx: number) => void;
    nextQuestion: () => void;
    resetGame: () => void;
    trivia: triviaFace | null
    questionIdx: number | null
}

/**
 * useQuizGame - A custom React hook to fetch quiz questions, manage timers, and track scores.
 * 
 * @returns {UseQuizGameReturn} Hook state and functions:
 *   - `clue`: Current question clue.
 *   - `correctAnswer`: The correct answer for the question.
 *   - `options`: Array of multiple-choice answers.
 *   - `score`: The total score (correct answer adds +5).
 *   - `timer`: The countdown timer (30s).
 *   - `isLoading`: Boolean indicating if data is being fetched.
 *   - `isGameOver`: Boolean indicating if the game has ended.
 *   - `submitAnswer(selectedOption)`: Submits user’s answer and updates score.
 *   - `nextQuestion()`: Loads the next question manually.
 *   - `resetGame()`: automatically resets the game.
 */
export default function useQuizGame(): UseQuizGameReturn {
    const [question, setQuestion] = useState<QuestionResponse | null>(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [trivia, setTrivia] = useState<triviaFace | null>(null)
    const [isTriviaLoading, setIsTriviaLoading] = useState<boolean>(false)

    /**
     * Fetches a new quiz question from the API.
     * Ends the game if no more questions are available.
     */
    const fetchQuestion = useCallback(async () => {
        if (isGameOver) return;

        setIsLoading(true);
        try {
            // Setting the trivia null to render the question interface
            setTrivia(null)
            const res = await axios.get<QuestionResponse>("/api/get-question");
            setQuestion(res.data);
            setTimer(30); // Reset timer
        } catch (error: any) {
            if (error.response?.status === 404) {
                setIsGameOver(true); // No more questions, end game
            } else {
                console.error("Error fetching question:", error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [isGameOver]);

    /**
 * Fetches a new quiz question from the API.
 * Ends the game if no more questions are available.
 */
    const fetchTrivia = async (questionIdx: number, isAnswerCorrect: boolean) => {
        try {
            const res = await axios.get(`/api/get-trivia?index=${questionIdx}`)
            setTrivia({
                trivia: res.data,
                wasCorrectAnswer: isAnswerCorrect
            })
        } catch (error: any) {
            if (error.response?.status === 500) {
                setIsTriviaLoading(false); // something went wrong in server side
            } else {
                console.error("Error fetching trivia:", error);
            }
        } finally {
            setIsTriviaLoading(false);
        }


    }

    /**
     * Submits the user's answer and checks if it's correct.
     * Adds +5 to the score if the answer is correct.
     * shows trivia
     * 
     * @param selectedOption The city name chosen by the user.
     */
    const submitAnswer = (selectedOption: string, questionIdx: number) => {
        let isAnswerCorrect = false
        if (question && selectedOption === question.question.city) {
            isAnswerCorrect = true;
            setScore(prev => prev + 5);
        }
        fetchTrivia(questionIdx, isAnswerCorrect)
    };

    /**
     * Manually loads the next question when "Next" button is clicked.
     */
    const nextQuestion = () => {
        fetchQuestion();
    };

    /**
     * Timer effect that counts down every second.
     * If timer reaches 0, it automatically fetches the next question.
     */
    useEffect(() => {
        if (timer === 0 && !isGameOver) {
            fetchQuestion();
        }

        const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, fetchQuestion, isGameOver]);

    // Fetch first question on component mount
    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    /**
  * Manually reset the game.
  */
    async function resetGame() {
        const response = await axios.get("/api/reset-questions")
        if (response.status === 200) {
            setScore(0)
            setIsGameOver(false)
            fetchQuestion()
        }
    }

    return {
        clue: question?.question.clue || "",
        correctAnswer: question?.question.city || "",
        questionIdx: question?.question.questionIdx || 0,
        options: question?.options || [],
        score,
        timer,
        isLoading,
        isGameOver,
        submitAnswer,
        nextQuestion,
        resetGame,
        isTriviaLoading,
        trivia,
    };
}
