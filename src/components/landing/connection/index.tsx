"use client"

import { useLanguage } from "@/context/Language";
import { useEffect, useRef } from "react";
import CardProject from "@/components/cardProject";
import CardTableProject from "@/components/cardTableConnection";
import {lastProject} from "@/components/cardTableConnection/connectionData";
import { useIsDevice } from "@/hooks/useIsDevices";
import Link from "next/link";

const Connection = () => {
    const { language } = useLanguage(); 
    const useIsDevices = useIsDevice();  

    const connectionRef = useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
        if(location.hash == '#connection'&& location.pathname === "/"){
            setTimeout(() => {
            scrollToAbout();
        }, 600);
        }
        const scrollToAbout = () => {
            if (connectionRef.current) {
                connectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };
    },[]);

    return ( 
        <div id="connection" ref={connectionRef} className="pt-44 w-full lg:w-3/4 flex justify-center items-center relative flex-col ">
            <p className='text-third text-lg font-extrabold absolute left-8 top-20 sm:left-[15%] sm:top-32 lg:left-0'>{language ? 'Koneksi' : "Connection"}</p>
            {useIsDevices === "desktop" ?
                <div className="w-full lg:flex flex-col gap-12 hidden">
                    <CardTableProject className="gap-5" itemsClassName="py-10 px-8" content={lastProject(language)}/>
                </div>
            :
            <div className="w-full flex  flex-col gap-12 ">
            {lastProject(language)[0].map((data, index) => (
                <CardProject
                    key={index}
                    image={data.content[0].imageUrl}
                    text={data.content[0].text}
                    urlPath={data.urlPath}
                    title={data.content[1].text || ""}
                    list={data.content[2].text||""}
                />
            ))}
            </div>
            }
            <Link href="/connection" className="pt-20 hover:text-third text-lg underline underline-offset-3 text-second">
                {language ? "Lihat semuanya.." : "See all.."}
            </Link>
        </div>
    );
}

export default Connection;