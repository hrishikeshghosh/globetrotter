'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface DialogContextType {
    isDialogShown: boolean;
    setIsDialogShown: Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [isDialogShown, setIsDialogShown] = useState(false);

    return (
        <DialogContext.Provider value={{ isDialogShown, setIsDialogShown }
        }>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};
