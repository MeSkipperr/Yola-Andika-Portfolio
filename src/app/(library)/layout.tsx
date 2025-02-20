import type { Metadata } from "next";
import "../globals.css";
import "../index.css";
import "./library.css";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { LanguageProvider } from "@/context/Language";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Curve from "@/components/curve";

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
                        <Curve>
                            <Navbar/>
                            <div className="fontGeist  w-full flex flex-col  items-center justify-center dark:text-white  bg-primary dark:bg-darkBg relative">
                                <Sidebar>
                                    {children}
                                    <div className="w-full h-32"></div>
                                </Sidebar>
                            </div>
                        </Curve>
                    </LanguageProvider>
                </DarkModeProvider>
            </body>
        </html>
    );
}
