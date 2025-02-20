import type { Metadata } from "next";
import "../globals.css";
import "../index.css";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { LanguageProvider } from "@/context/Language";
import Curve from "@/components/curve";

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
            <Curve>
              <div className=" flex  items-center flex-col bg-primary dark:bg-darkBg ">
                {children}
              </div>
            </Curve>
          </LanguageProvider>
          </DarkModeProvider>
      </body>
    </html>
  );
}
