"use client"
import { useDarkMode } from "@/context/DarkModeContext";
import { useLanguage } from "@/context/Language";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
    const { language } = useLanguage();  
    const { isDarkMode } = useDarkMode();
    
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    const pathUrl = () => {
        if (currentPath === '/') {
            return '#';
        } else if (currentPath !== '/') {
            return '/';
        }
        return '';
    };

    return (
        <>
            <Image
                src={isDarkMode ? "/assets/background/darkFooter.svg" : "/assets/background/lightFooter.svg"}
                alt="Background Layer Color"
                className="w-full"
                width={1000}
                height={1000}
            />
            <div className="w-full h-72 bg-[#ececec] dark:bg-[#101012] flex justify-center items-center px-4">
                <div className="w-full lg:w-3/4 flex flex-col">
                    <div className="flex justify-between sm:justify-between lg:justify-start items-center px-4 mb-4 lg:mb-10">
                        <div className="lg:w-1/2 lg:flex lg:items-center lg:flex-col">
                            <p className="dark:text-white text-xl font-semibold sm:text-4xl">I Kadek</p>
                            <p className="dark:text-white text-xl font-semibold sm:text-4xl">Yola</p>
                            <p className="dark:text-white text-xl font-semibold sm:text-4xl">Andika</p>
                        </div>
                        <div className="flex flex-col lg:px-12">
                            <p className="dark:text-white text-lg sm:text-3xl">Tautan</p>
                            <Link className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href="/">{language ? 'Beranda' : 'Home'}</Link>
                            <Link className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href={`${pathUrl()}about`}>{language ? 'Tentang' : 'About'}</Link>
                            <Link className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href={`${pathUrl()}service`}>{language ? 'Layanan' : 'Service'}</Link>
                            <Link className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href={`${pathUrl()}project`}>{language ? 'Proyek' : 'Project'}</Link>
                            <Link className=" pl-1 text-[#A2A9B4] text-sm sm:text-xl" href={`/contact`}>{language ? 'Kontak' : 'Contact'}</Link>
                        </div>
                        <div className="flex flex-col lg:px-12">
                            <p className="dark:text-white text-lg sm:text-3xl">Sosial</p>
                            <Link className="pl-1 text-[#A2A9B4] text-sm sm:text-xl" target="blank" href="mailto:ikadekyolaandika02@gmail.com">Email</Link>
                            <Link className="pl-1 text-[#A2A9B4] text-sm sm:text-xl" target="blank" href="https://github.com/MeSkipperr">Github</Link>
                            <Link className="pl-1 text-[#A2A9B4] text-sm sm:text-xl" target="blank" href="https://www.instagram.com/kdk.yolaandika">Instagram</Link>
                        </div>
                    </div>
                    <hr className="border-t-1 sm:border-t-2 border-black dark:border-white my-4" />
                    <p className="dark:text-white text-sm sm:text-xl text-center">{language ? 'Dibuat dengan ❤️ oleh I Kadek Yola Andika menggunakan ' : "Created with ❤️ by I Kadek Yola Andika using "}<span className="text-second">Next JS, Typescript &  Tailwind Css. </span>&#169; {new Date().getFullYear()}</p>
                </div>
            </div>
        </>
    );
}

export default Footer;
