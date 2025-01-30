import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
    _id: string;
    username: string;
    email: string;
    address: string;
    phone: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    token: string;
    setToken: (token: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (storedToken) {
            setToken(storedToken);
        }
        if (userId) {
            fetchUser(userId);
        }
    }, []);

    const fetchUser = async (userId: string) => {
        try {
            const response = await axios.get<User>(`http://localhost:3000/user/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };

    return (
        <UserContext.Provider value={{ token, setToken, user, setUser, searchTerm, setSearchTerm }}>
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