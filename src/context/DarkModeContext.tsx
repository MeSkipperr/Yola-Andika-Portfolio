"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

interface DarkModeContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load mode dari localStorage saat mount
    useEffect(() => {
        const mode = localStorage.getItem("theme");
        setIsDarkMode(mode === "dark");
        if (mode === "dark") document.documentElement.classList.add("dark");
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            document.documentElement.classList.toggle("dark", newMode);
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
};
