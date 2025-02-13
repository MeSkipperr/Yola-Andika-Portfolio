"use client"
import TextCard from "@/components/card/text-card";
import Navbar from "@/components/navbar";
import { useLanguage } from "@/context/Language";

const Apps = () => {
    const {language} = useLanguage();
    return ( 
        <>
            <Navbar/>
            <div className="w-full h-dvh flex justify-start items-center px-2 flex-col lg:w-3/4">
                <div className="w-full h-[20dvh]"></div>
                <h3 className=" dark:text-white text-6xl lg:text-9xl w-full">{language ? "Aplikasi" : "Application "}</h3>
                <span className="border w-full my-5 border-softGray"></span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <TextCard />
                    <TextCard />
                    <TextCard />
                    <TextCard />
                    <TextCard />
                    <TextCard />
                </div>
            </div>
        </>
    );
}

export default Apps;