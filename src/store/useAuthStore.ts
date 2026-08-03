import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
    id: number;
    name: string;
    email: string;
};

type AuthState = {
    user: User | null;

    accessToken: string | null;
    refreshToken: string | null;

    isAuthenticated: boolean;

    login: (
        user: User,
        accessToken: string,
        refreshToken: string,
    ) => void;

    updateTokens: (
        accessToken: string,
        refreshToken: string,
    ) => void;

    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,

            accessToken: null,
            refreshToken: null,

            isAuthenticated: false,

            login: (
                user,
                accessToken,
                refreshToken,
            ) =>
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                }),

            updateTokens: (
                accessToken,
                refreshToken,
            ) =>
                set({
                    accessToken,
                    refreshToken,
                }),

            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: 'auth-storage',
        },
    ),
);
