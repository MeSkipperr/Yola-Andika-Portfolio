"use client"

import ConnectionList from "@/components/landing/connection/connectionList";
import { useLanguage } from "@/context/Language";

const Connection = () => {
    const { language } = useLanguage();

    return (
        <div className="w-full  flex lg:w-3/4  flex-col justify-start items-center px-2 gap-6" style={{ zIndex: 10 }}>
            <div className="w-full h-[30dvh]"></div>
            <h3 className=" dark:text-white text-6xl lg:text-9xl">{language ? "Perpaduan teknologi dan kreativitas" : "A Fusion of Technology and Creativity "}</h3>
            <ConnectionList language={language}/>
        </div>
    );
}

export default Connection;