import React from 'react'
import Invite from './Invite'

const GameOver = ({ score, resetGame }: { score: number, resetGame: () => void }) => {



    return (
        <div className="col-span-1 flex flex-col gap-4 my-4 p-8 rounded-3xl bg-[#D91656]/20 backdrop-blur-2xl">
            <p className=" text-6xl font-bold tracking-widest text-[#D91656] text-center">
                Game Over!
            </p>
            <p className=" text-3xl font-montserrat font-semibold tracking-wider">
                Your Score: {score}
            </p>
            <button
                onClick={resetGame}
                className="start-game-btn w-full mt-4 font-semibold"
            >
                Play Again!
            </button>
            <Invite />
        </div>
    )
}

export default GameOver