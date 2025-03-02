'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface UserProviderType {
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserProviderType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userName, setUserName] = useState("");

    return (
        <UserContext.Provider value={{ userName, setUserName }
        }>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserProviderType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};
