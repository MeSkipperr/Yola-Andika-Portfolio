import type { Metadata } from "next";
import "../globals.css";
import "../index.css";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { LanguageProvider } from "@/context/Language";

export const metadata: Metadata = {
  title: "I Kadek Yola Andika | Applications",
  description: "Application",
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
            <div className=" flex  items-center flex-col bg-primary dark:bg-darkBg ">
              {children}
            </div>
          </LanguageProvider>
          </DarkModeProvider>
      </body>
    </html>
  );
}
