import React, { SetStateAction } from 'react'

const Notice = ({ setNotice }: { setNotice: React.Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className=' absolute top-1/2 left-1/2 -translate-1/2 w-[95%] h-[95%] rounded-3xl bg-white/50 backdrop-blur-xl p-4'>
            <p className=' text-5xl text-center text-app-default-red font-semibold tracking-wider underline'>Notice</p>
            <p className=' text-xl font-montserrat text-center text-black font-semibold tracking-wider'>Official Directive from the High Command, Space Research Organization</p>
            <div className=' mt-8 font-montserrat text-black font-semibold'>
                To: Globetrotter K-47<br />
                Subject: Pre-Deployment Assessment & Earth Expedition<br />
                <br />
                Globetrotter,
            </div>
            <div className='mt-2 font-montserrat text-black font-semibold'>
                You have been selected for a reconnaissance mission to Earth. Your objective is to observe, learn, and integrate seamlessly among its inhabitants. However, before you are granted planetary entry, you must undergo a final assessment to evaluate your understanding of Earth&apos;s geography, cultures, and cities.

                Failure to demonstrate sufficient knowledge will result in mission suspension. Prepare for immediate testing. Further instructions will follow upon successful completion.

                Stand by.
                <br />
                <br />
                <span className=' font-bold underline'> — High Command.</span>
            </div>
            <button onClick={() => setNotice(false)} className='start-game-btn w-full mt-10 font-semibold'>Start Test</button>
        </div>
    )
}

export default Notice