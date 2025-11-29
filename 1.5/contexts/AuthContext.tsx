import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string, deviceFingerprint: string, deviceName: string) => Promise<void>;
    register: (username: string, password: string, deviceFingerprint: string, deviceName: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is already logged in on mount
    useEffect(() => {
        const initAuth = async () => {
            if (authService.isAuthenticated()) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to get user:', error);
                    authService.logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username: string, password: string, deviceFingerprint: string, deviceName: string) => {
        const response = await authService.login({
            username,
            password,
            deviceFingerprint,
            deviceName,
        });
        setUser(response.user);
    };

    const register = async (username: string, password: string, deviceFingerprint: string, deviceName: string) => {
        const response = await authService.register({
            username,
            password,
            deviceFingerprint,
            deviceName,
        });
        setUser(response.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
