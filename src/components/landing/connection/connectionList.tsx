"use client"
import CardProject from "@/components/cardProject";
import CardTableProject from "@/components/cardTableConnection";
import { listExperience, listNetwork, listWebsite } from "@/components/cardTableConnection/connectionData";
import { useIsDevice } from "@/hooks/useIsDevices";
import { useEffect, useState } from "react";

interface ConnectionList {
    language: boolean;
    validTab?:number;
}

const ConnectionList = ({ language,validTab}: ConnectionList) => {
    console.log("active tab now : " , validTab)
    const [activeTab, setActiveTab] = useState(0);
    const device = useIsDevice();

    useEffect(() => {
        if (validTab !== undefined) {
            setActiveTab(validTab);
        }
    }, [validTab]);

    const tabsList = [
        "Website",
        `${language ? "Jaringan" : "Network"}`,
        `${language ? "Pengalaman" : "Experience"}`
    ]

    const dataWebsite = listWebsite(language);
    const dataExperience = listExperience(language);
    const dataNetwork = listNetwork(language);

    return (
        <>
            <div className=" flex w-full  gap-2 lg:gap-4 px-2">
                {tabsList.map((tab, index) => (
                    <span
                        key={tab}
                        onClick={() => setActiveTab(index)}
                        className={`text-base py-2 lg:py-4 border rounded-full lg:px-6 px-4 cursor-pointer z-20 
                ${activeTab === index
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "dark:text-white  text-black"
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>
            {activeTab === 0 && (
                device === "desktop" ? (
                    <CardTableProject className="gap-5 hidden sm:flex" itemsClassName="py-10 px-8" content={dataWebsite} />
                ) :
                    <div className="w-full flex flex-col justify-center items-center gap-10 ">
                        {dataWebsite[0].map((data, index) =>
                            <CardProject
                                key={index}
                                image={data.content[0].imageUrl || ""}
                                urlPath={data.urlPath}
                                title={data.content[1].text || ""}
                                list={data.content[2].text || ""}
                            />
                        )}
                    </div>
            )}
            {activeTab === 1 && (
                device === "desktop" ? (
                    <CardTableProject className="gap-5 hidden sm:flex" itemsClassName="py-10 px-8" content={dataNetwork} />
                ) :
                    <div className="w-full flex flex-col justify-center items-center gap-10 ">
                        {dataNetwork[0].map((data, index) =>
                            <CardProject
                                key={index}
                                image={data.content[0].imageUrl || ""}
                                urlPath={data.urlPath}
                                title={data.content[1].text || ""}
                                list={data.content[2].text || ""}
                            />
                        )}
                    </div>
            )}
            {activeTab === 2 && (
                device === "desktop" ? (
                    <CardTableProject className="gap-5 hidden sm:flex" itemsClassName="py-10 px-8" content={dataExperience} />
                ) :
                    <div className="w-full flex flex-col justify-center items-center gap-10 ">
                        {dataExperience[0].map((data, index) =>
                            <CardProject
                                key={index}
                                image={data.content[0].imageUrl || ""}
                                urlPath={data.urlPath}
                                text={data.content[0].text || ""}
                                title={data.content[1].text || ""}
                                list={data.content[2].text || ""}
                            />
                        )}
                    </div>
            )}
        </>
    );
}

export default ConnectionList;