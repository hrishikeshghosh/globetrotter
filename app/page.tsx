'use client'

import RocketLaunch from "@/components/RocketLaunch"
import { useUser } from "@/contexts/userProvider"
import { useCreateUser } from "@/hooks/useCreateUser"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"


export default function Home() {

  const { createUser } = useCreateUser()
  const searchParams = useSearchParams()
  const invitee = searchParams.get('invitee')
  const { userName, setUserName } = useUser()
  const router = useRouter()


  useEffect(() => { }, [invitee])




  return <div className=" w-full h-screen relative overflow-x-hidden overflow-y-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className=" w-full h-full object-cover"
    >
      <source src='/videos/start_game_bg.mp4' />
    </video>
    <RocketLaunch />
    <div className=" absolute z-50 right-0 top-1/2 mr-8 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-6 rounded-3xl ">
      <p className=" font-semibold text-6xl text-app-default-red">Hello, Traveller!</p>
      <p className=" text-black font-montserrat mt-2 mb-4">The Globetrotter Challenge – The Ultimate Travel Guessing Game!</p>
      <div className=" mt-10 flex items-center gap-2">
        <div className="input__container">
          <div className="shadow__input"></div>
          <button className="input__button__shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000000"
              width="20px"
              height="20px"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            name="username"
            className="input__search"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <button onClick={async () => {
          await createUser(userName)
          router.push(`/game?player=${userName}`)
        }} className="start-game-btn font-montserrat font-semibold tracking-wider">Start Game</button>

      </div>



    </div>
  </div>
}
