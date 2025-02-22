"use client"
import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";

const content = [
    {
        language:"tsx",
        code:`
"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

interface DarkModeContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

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
};`
    },
]

const Page = () => {
    const { language } = useLanguage();
    return (
        <div className="w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl">Dark Mode Hook</h1>
            <code>context/DarkMode.tsx</code>
            <p className="text-base">
                {language
                    ? "File ini berisi hook dan provider untuk mengelola mode gelap (dark mode) dalam aplikasi React menggunakan konteks."
                    : "This file contains a hook and provider for managing dark mode in a React application using context."}
            </p>
            <CodeBlock content={content} />
            
            <h2 className="text-3xl">{language ? "Implementasi" : "Implementation"}</h2>
            
            <h3 className="text-xl">{language ? "Menggunakan Dark Mode dalam Komponen" : "Using Dark Mode in a Component"}</h3>
            <CodeBlock content={[{
                language:"tsx",
                code:`const { isDarkMode, toggleDarkMode } = useDarkMode();
<button onClick={toggleDarkMode}>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</button>`
            }]}  />
            <p>
                {language
                    ? "Fungsi "
                    : "The "}
                <code>useDarkMode</code>{" "}
                {language
                    ? "mengembalikan status saat ini dan fungsi untuk mengganti mode gelap."
                    : "returns the current dark mode status and a function to toggle the mode."}
            </p>

            <h3 className="text-xl">{language ? "Menyediakan Dark Mode di Aplikasi" : "Providing Dark Mode in the Application"}</h3>
            <CodeBlock content={[{
                language:"tsx",
                code:`<DarkModeProvider>
    <App />
</DarkModeProvider>`
            }]}  />
            <p>
                {language
                    ? "Komponen "
                    : "The "}
                <code>DarkModeProvider</code>{" "}
                {language
                    ? "harus membungkus aplikasi agar hook dapat digunakan."
                    : "must wrap the application for the hook to be usable."}
            </p>
        </div>
    );
};

export default Page;
