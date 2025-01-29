// frontend/src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
    userName: string;
    setUserName: (name: string) => void;
    token: string;
    setToken: (token: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
    const [userName, setUserName] = useState<string>(localStorage.getItem('userName') || '');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
    }, [token]);

    useEffect(() => {
        localStorage.setItem('userName', userName);
    }, [userName]);

    return (
        <UserContext.Provider value={{ token, setToken, userName, setUserName, searchTerm, setSearchTerm }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};