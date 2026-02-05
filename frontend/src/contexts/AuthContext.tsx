import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface Admin {
    id: number;
    username: string;
}

interface AuthContextType {
    admin: Admin | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if we have a token and validate it
        const token = api.getToken();
        if (token) {
            api.getMe()
                .then(response => {
                    setAdmin(response.admin);
                })
                .catch(() => {
                    api.setToken(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username: string, password: string) => {
        const result = await api.login(username, password);
        setAdmin(result.admin);
    };

    const logout = () => {
        api.logout();
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{
            admin,
            loading,
            login,
            logout,
            isAuthenticated: !!admin
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
