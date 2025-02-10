"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the types for the context
interface LanguageContextType {
    language: boolean; // `true` for Indonesian, `false` for English
    setLanguage: (lang: boolean) => void;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<boolean>(false); // Default to English

    useEffect(() => {
        // Check if we are on the client side
        if (typeof window !== 'undefined') {
            const storedLanguage = localStorage.getItem("language");
            if (storedLanguage) {
                setLanguage(storedLanguage === "ID");
            }
        }
    }, []);

    // Update localStorage whenever language state changes
    const updateLanguage = (lang: boolean) => {
        setLanguage(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem("language", lang ? "ID" : "EN");
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
