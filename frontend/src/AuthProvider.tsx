import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { JSX } from 'react';
import './App.css';
import { isUser, type User } from './types/User';
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

type AuthContextType = {
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: JSX.Element;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
    const navigate = useNavigate();
    const didAuthRun = useRef(false);
    const [checking, setChecking] = React.useState(true);

    useEffect(() => {
        if (didAuthRun.current) {
            return;
        }

        const checkLocalStorage = async () => {
            const localStorageUserId = localStorage.getItem('userId');
            if (!localStorageUserId) {
                const newUserId: string | undefined = await registerUser();

                if (!newUserId) {
                    return;
                }
                localStorage.setItem('userId', newUserId);
                setUserId(newUserId);
                return;
            }

            if (await checkAuth(localStorageUserId)) {
                localStorage.setItem('userId', localStorageUserId);
                setUserId(localStorageUserId);
                return;
            }
        };
        checkLocalStorage();
        didAuthRun.current = true;
    }, []);

    const checkAuth = async (localStorageUserId: string) => {
        // 認証チェックのためのAPI呼び出し
        try {
            const response = await fetch(`${API_ORIGIN}/api/auth/${localStorageUserId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.status === 200) {
                setChecking(false);
                return true;
            }
            if (response.status === 204) {
                registerUser();
                return true;
            }
            if (response.status === 401) {
                navigate('/unauthorized');
                return false;
            }
            if (response.status === 500) {
                navigate('/internal-server-error');
                return false;
            }
            throw new Error(`想定外のステータスコード: ${response.status}`);
        } catch (error) {
            console.error(error);
            navigate('/unexpected-error');
            return false;
        }
    };

    const registerUser = async () => {
        // 認証チェックのためのAPI呼び出し
        try {
            const response = await fetch(`${API_ORIGIN}/api/user`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.status === 201) {
                const data = await response.json();
                if (!isUser(data)) {
                    throw new Error();
                }
                const responsedUserObj = data as User;
                localStorage.setItem('userId', responsedUserObj.userId);

                setChecking(false);
                return responsedUserObj.userId;
            }
            if (response.status === 401) {
                navigate('/unauthorized');
                return;
            }
            if (response.status === 500) {
                navigate('/internal-server-error');
                return;
            }
            throw new Error(`想定外のステータスコード: ${response.status}`);
        } catch (error) {
            console.error(error);
            navigate('/unexpected-error');
            return;
        }
    };

    if (checking) return <div>認証中...</div>;
    return <AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
