import { useDialog } from '@/contexts/dialogProvider'
import React from 'react'

const SharePopup = () => {
    const { setIsDialogShown } = useDialog()

    const copyToClipboard = async () => {
        try {
            const link = `/?invitee=${abra}`;
            await navigator.clipboard.writeText(link);

        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className='z-50 absolute w-[50%] h-fit p-8 bg-black/80 backdrop-blur-2xl rounded-3xl top-1/2 left-1/2 -translate-1/2'>
            <p className=' text-5xl text-center underline'>Challenge A Friend!</p>
            <div className=' flex items-center gap-2 mt-8'>
                <div className='p-4 rounded-3xl bg-black grow text-sm font-montserrat'>
                    {`http://localhost:3000/?invitee=hrishikehs_gh`}
                </div>
                <button className='start-game-btn'>Share</button>
                <button className='start-game-btn' onClick={() => setIsDialogShown(false)}>Close</button>
            </div>
        </div>

    )
}

export default SharePopup