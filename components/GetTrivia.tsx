import { triviaFace } from '@/hooks/useStartGame'
import Lottie from 'lottie-react'
import React from 'react'
import confetti from '@/public/lotties/confetti.json'
import sadFace from '@/public/lotties/sadFace.json'

const GetTrivia = ({ trivia, nextQuestion }: { trivia: triviaFace, nextQuestion: () => void }) => {
    return (
        <div className="bg-black/20 backdrop-blur-2xl p-4  rounded-3xl">
            <div>
                <div className=' w-full flex justify-center'>
                    <div className='mb-4 w-[150px] h-[150px] '>
                        <Lottie animationData={trivia?.wasCorrectAnswer ? confetti : sadFace} loop={true} />
                    </div>
                </div>
                <p className=' mt-2 text-2xl text-center text-app-default-red'>{trivia?.wasCorrectAnswer ? 'Hooray! That was correct!' : 'Oh, that was  Incorrect, better luck next time!'}</p>
            </div>


            <p className=" text-6xl font-bold tracking-widest text-[#3D3BF3] text-center">
                Did you know?
            </p>
            <div className='flex items-center gap-2'>
                <div className=' w-fit p-4 rounded-3xl bg-[#EB5B00]/20 backdrop-blur-2xl'>
                    <p className=" text-2xl font-bold tracking-widest text-[#EB5B00] text-center">
                        Func Fact *
                    </p>
                    <p className=" text-lg font-montserrat font-semibold tracking-wider">
                        {trivia.trivia.funFact}
                    </p>
                </div>
                <div className=' w-fit p-4 rounded-3xl bg-[#FFB200]/20 backdrop-blur-2xl'>
                    <p className=" text-2xl font-bold tracking-widest text-[#FFB200] text-center">
                        Trivia *
                    </p>
                    <p className=" text-lg font-montserrat font-semibold tracking-wider">
                        {trivia.trivia.trivia}
                    </p>
                </div>
            </div>

            <button
                onClick={nextQuestion}
                className="start-game-btn w-full mt-4 font-semibold"
            >
                Next Question!
            </button>
        </div>
    )
}

export default GetTrivia