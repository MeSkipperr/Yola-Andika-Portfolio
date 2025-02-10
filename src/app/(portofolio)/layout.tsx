import type { Metadata } from "next";
import "../globals.css";
import "../index.css";
import Navbar from "@/components/navbar";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { LanguageProvider } from "@/context/Language";
import Curve from "@/components/curve";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "I Kadek Yola Andika",
  description: "Portofolio",
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
                  <div className=" flex  items-center flex-col bg-primary dark:bg-darkBg ">
                    {children}
                    <Footer/>
                  </div>
              </Curve>
          </LanguageProvider>
          </DarkModeProvider>
      </body>
    </html>
  );
}
