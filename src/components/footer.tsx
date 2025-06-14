"use client"
import { contactConfig } from "@/config/contact";
import { useDarkMode } from "@/context/DarkModeContext";
import { useLanguage } from "@/context/Language";
import Image from "next/image";
import Link from "next/link";

type FooterProps = {
    darkColor?: string;
    lightColor?: string;
    textColor?: string;
    transitionColor?: boolean;
};

const Footer = ({
    darkColor = "#101012",
    lightColor = "#ececec",
    textColor = "#A2A9B4",
    transitionColor = true,
}: FooterProps) => {
    const { language } = useLanguage();  
    const { isDarkMode } = useDarkMode();


    return (
        <>
            {transitionColor && (
                <Image
                    src={isDarkMode ? "/assets/background/darkFooter.svg" : "/assets/background/lightFooter.svg"}
                    alt="Background Layer Color"
                    className="w-full"
                    width={1000}
                    height={1000}
                />
            )}
            <div className="w-full h-72 flex justify-center items-center px-4" style={{ backgroundColor: isDarkMode ? darkColor : lightColor }}>
                <div className="w-full lg:w-3/4 flex flex-col">
                    <div className="flex justify-between sm:justify-between lg:justify-start items-center px-4 mb-4 lg:mb-10">
                        <Link href="/" className="lg:w-1/2 lg:flex lg:items-center lg:flex-col">
                            <p className="text-xl font-semibold sm:text-4xl" style={{ color: textColor }}>I Kadek</p>
                            <p className="text-xl font-semibold sm:text-4xl" style={{ color: textColor }}>Yola</p>
                            <p className="text-xl font-semibold sm:text-4xl" style={{ color: textColor }}>Andika</p>
                        </Link>
                        <div className="flex flex-col lg:px-12">
                            <p className="text-lg sm:text-3xl" style={{ color: textColor }}>Tautan</p>
                            <Link className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} href="/">{language ? 'Beranda' : 'Home'}</Link>
                            <a className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} href={`/#about`}>{language ? 'Tentang' : 'About'}</a>
                            <a className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} href={`/#service`}>{language ? 'Layanan' : 'Service'}</a>
                            <a className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} href={`/connection`}>{language ? 'Koneksi' : 'Connection'}</a>
                            <a className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} href="/contact">{language ? 'Kontak' : 'Contact'}</a>
                        </div>
                        <div className="flex flex-col lg:px-12">
                            <p className="text-lg sm:text-3xl" style={{ color: textColor }}>Sosial</p>
                            <Link className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} target="_blank" href={`mailto:${contactConfig.email}`}>Email</Link>
                            <Link className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} target="_blank" href={contactConfig.github.url}>Github</Link>
                            <Link className="pl-1 text-sm sm:text-xl" style={{ color: textColor }} target="_blank" href={contactConfig.instagram.url}>Instagram</Link>
                        </div>
                    </div>
                    <hr className="border-t-1 sm:border-t-2 my-4" style={{ borderColor: textColor }} />
                    <p className="text-sm sm:text-xl text-center" style={{ color: textColor }}>
                        {language ? 'Dibuat dengan ❤️ oleh I Kadek Yola Andika menggunakan ' : "Created with ❤️ by I Kadek Yola Andika using "}
                        <span className="text-second">Next JS, Typescript & Tailwind CSS.</span> &#169; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;