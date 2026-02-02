import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { UserProfileResponse } from "../api/auth";
import { axiosInstance } from "../api/axios";


/**
 * questo componente mantiente lo State of user (check session , check login)
 * questo e' componente Parent e da Props agli Child che vogliono lo stato del utente
 */
interface AuthContextType {
    user: UserProfileResponse | null; //se utente e' logIn altrimenti Null
    isLoading: boolean; // check session 
    login: (user: UserProfileResponse) => void; //se login chiama MyAccount.tsx
    logout: () => Promise<void>;
    isAuthenticated: boolean; //se authenticated, mostra il nome su header
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); //crea un context object

export function AuthProvider({ children }: { children: ReactNode }) { // manda tutto(user, isloagind, login, logout) a tutti i componenti
    const [user, setUser] = useState<UserProfileResponse | null>(null); //mantiene lo stato del utente
    const [isLoading, setIsLoading] = useState(true); //lo stato del session

    useEffect(() => {
        // Check for existing session on mount
        const checkSession = async () => {
            try {
                const response = await axiosInstance.get<UserProfileResponse>("/auth/me"); // check da backend endpoint(controller)
                setUser(response.data);
            } catch (error) {
                // Not logged in or session expired
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []); // [] importante, se fa refresh deve far login di nuovo

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

export function useAuth() { //esporta tutto per ogni componente (useAuth)
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
