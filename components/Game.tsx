import useQuizGame from "@/hooks/useStartGame";
import React from "react";
import GetTrivia from "./GetTrivia";
import GameOver from "./GameOver";
import { useDialog } from "@/contexts/dialogProvider";
import SharePopup from "./SharePopup";

const Game = () => {
    const { isDialogShown } = useDialog();
    const {
        clue,
        trivia,
        questionIdx,
        isGameOver,
        options,
        score,
        timer,
        submitAnswer,
        nextQuestion,
        resetGame,
    } = useQuizGame();

    function chooseOption(selectedOption: string) {
        submitAnswer(selectedOption, questionIdx!);
    }

    return (
        <div className="w-full h-full absolute top-0 left-0 p-8 z-50">
            {isDialogShown &&
                <SharePopup />
            }
            <div className=" flex items-center justify-between">
                <p className=" text-4xl p-2 rounded-3xl text-[#D91656] tracking-wider bg-[#D91656]/20 backdrop-blur-2xl">
                    Your Current Score: {score}
                </p>
                <p className=" text-4xl p-2 rounded-3xl text-[#ED3EF7] tracking-wider bg-[#ED3EF7]/20 backdrop-blur-2xl">
                    Your High Score: 530
                </p>
                <p className=" text-4xl p-2 rounded-3xl text-[#7C00FE] tracking-wider bg-[#7C00FE]/20 backdrop-blur-2xl">
                    Game High Score: 560
                </p>
            </div>
            <div className="w-full grid grid-cols-2 relative">
                <div className=" col-span-1"></div>
                {isGameOver ? (
                    <GameOver score={score} resetGame={resetGame} />
                ) : trivia ? (
                    <div className=" col-span-1">
                        <GetTrivia trivia={trivia} nextQuestion={nextQuestion} />
                    </div>
                ) : (
                    <div className="col-span-1 my-4 p-8 rounded-3xl bg-black/20 backdrop-blur-2xl">
                        <div className=" flex items-center justify-between">
                            <p className=" text-center text-3xl">Globetrotter Challenge!</p>
                            <div className=" flex items-center gap-1">
                                <div className=" p-2 rounded-lg bg-white/20 backdrop-blur-2xl text-white">
                                    <p className=" text-3xl">0</p>
                                </div>
                                <div className=" p-2 rounded-lg bg-white/20 backdrop-blur-2xl text-white">
                                    <p className=" text-3xl">0</p>
                                </div>
                                <div className=" p-2 rounded-lg bg-white/20 backdrop-blur-2xl text-white">
                                    <p className=" text-3xl">:</p>
                                </div>
                                <div className=" p-2 rounded-lg bg-white/20 backdrop-blur-2xl text-white">
                                    <p className=" text-3xl">{timer}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mt-4 w-full bg-[#D91656]/20 text-[#D91656] backdrop-blur-2xl p-2 rounded-lg trackign-wider">
                                <p className=" text-3xl tracking-widest">Clue</p>
                                <p className=" font-xl text-white font-montserrat tracking-wider font-semibold">
                                    {clue}
                                </p>
                            </div>
                            <p className=" text-3xl tracking-widest mt-8">Options:</p>
                            <div className=" flex items-center justify-evenly mt-2">
                                {options?.map((item, idx) => (
                                    <button
                                        onClick={() => chooseOption(item)}
                                        key={idx}
                                        className="option-button tracking-wide"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="start-game-btn w-full mt-10 font-semibold"
                                onClick={() => nextQuestion()}
                            >
                                Skip Question
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        // <div>
        //     <h1>Quiz Game</h1>
        //     <h3>Score: {score}</h3>

        //     {isGameOver ? (
        //         <h2>Game Over! No more questions available.</h2>
        //     ) : (
        //         <>
        //             <h4>Time Left: {timer}s</h4>

        //             {isLoading ? (
        //                 <p>Loading question...</p>
        //             ) : (
        //                 <>
        //                     <p><strong>Clue:</strong> {clue}</p>
        //                     <div>
        //                         {options.map((option) => (
        //                             <button key={option} onClick={() => submitAnswer(option)}>
        //                                 {option}
        //                             </button>
        //                         ))}
        //                     </div>
        //                     <button onClick={nextQuestion}>Next Question</button>
        //                 </>
        //             )}
        //         </>
        //     )}
        // </div>
    );
};

export default Game;
