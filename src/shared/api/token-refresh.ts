import { refreshTokens } from '../../features/auth/api/auth.api';
import { useAuthStore } from '../../store/useAuthStore';

let refreshPromise: Promise<string> | null = null;

export async function refreshAccessToken(): Promise<string> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        const {
            refreshToken,
            updateTokens,
        } = useAuthStore.getState();

        if (!refreshToken) {
            throw new Error('Missing refresh token');
        }

        const tokens = await refreshTokens({
            refreshToken,
        });

        updateTokens(
            tokens.accessToken,
            tokens.refreshToken,
        );

        return tokens.accessToken;
    })();

    try {
        return await refreshPromise;
    } finally {
        refreshPromise = null;
    }
}
