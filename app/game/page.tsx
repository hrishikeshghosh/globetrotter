
'use client'

import Game from '@/components/Game'
import Notice from '@/components/Nortice'
import React, { useState } from 'react'



const Page = () => {
    const [isNoticeShown, setIsNoticeShown] = useState<boolean>(true)

    return (
        <div className=" w-full h-fit relative overflow-x-hidden overflow-y-auto">
            <video
                autoPlay
                loop
                muted
                playsInline
                className=" w-full h-full object-cover"
            >
                <source src='/videos/game-bg.mp4' />
            </video>
            {isNoticeShown && <Notice setNotice={setIsNoticeShown} />}
            {!isNoticeShown && <Game />}
        </div>
    )
}

export default Page