import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getInitialTheme, nextTheme, THEME_KEY, type Theme } from '../utils/theme';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => nextTheme(prev));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
