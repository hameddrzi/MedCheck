import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { UserProfileResponse } from "../api/auth";
import { axiosInstance } from "../api/axios";

interface AuthContextType {
    user: UserProfileResponse | null;
    isLoading: boolean;
    login: (user: UserProfileResponse) => void;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfileResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const checkSession = async () => {
            try {
                const response = await axiosInstance.get<UserProfileResponse>("/auth/me");
                setUser(response.data);
            } catch (error) {
                // Not logged in or session expired
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = (userData: UserProfileResponse) => {
        setUser(userData);
    };

    const logout = async () => {
        // Since /auth/logout endpoint was removed, we only clear client-side state
        setUser(null);
        sessionStorage.clear();
        localStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
