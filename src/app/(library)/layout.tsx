import type { Metadata } from "next";
import "../globals.css";
import "../index.css";
import "./library.css";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { LanguageProvider } from "@/context/Language";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
    title: "I Kadek Yola Andika | Library",
    description: "Library",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <DarkModeProvider>
                    <LanguageProvider>
                        <Navbar/>
                        <div className="fontGeist  w-full flex flex-col  items-center justify-center  bg-primary dark:bg-darkBg relative">
                            <Sidebar>
                                {children}
                            </Sidebar>
                        </div>
                    </LanguageProvider>
                </DarkModeProvider>
            </body>
        </html>
    );
}
