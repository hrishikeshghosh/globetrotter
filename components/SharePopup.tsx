import { useDialog } from '@/contexts/dialogProvider'
import { useUser } from '@/contexts/userProvider'
import React from 'react'
import { toast } from 'react-toastify'

const SharePopup = () => {
    const { setIsDialogShown } = useDialog()
    const { userName } = useUser()

    const copyToClipboard = async () => {
        try {
            const link = `https://globetrotter-beta.netlify.app/?invitee=${userName}`;
            await navigator.clipboard.writeText(link);
            toast.success("Url Copied!")
            setIsDialogShown(false)
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className='z-50 absolute w-[50%] h-fit p-8 bg-black/80 backdrop-blur-2xl rounded-3xl top-1/2 left-1/2 -translate-1/2'>
            <p className=' text-5xl text-center underline'>Challenge A Friend!</p>
            <div className=' flex items-center gap-2 mt-8'>
                <div className='p-4 rounded-3xl bg-black grow text-sm font-montserrat'>
                    {`https://globetrotter-beta.netlify.app/?invitee=hrishikehs_gh`}
                </div>
                <button onClick={copyToClipboard} className='start-game-btn'>Share</button>
                <button className='start-game-btn' onClick={() => setIsDialogShown(false)}>Close</button>
            </div>
        </div>

    )
}

export default SharePopup