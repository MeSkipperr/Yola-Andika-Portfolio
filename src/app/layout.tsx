import type { Metadata } from "next";
import "./globals.css";
import "./index.css";


export const metadata: Metadata = {
  title: "I Kadek Yola Andika",
  description: "Portofolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
