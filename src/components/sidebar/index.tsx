"use client"
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { SidebarContent } from "./items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const pathUrl = usePathname();
    const pathSegments = pathUrl.split("/").filter(segment => segment);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full lg:w-3/4 min-h-dvh flex  relative ">
            <div className={`z-10 px-2 w-3/4 gap-4 flex flex-grow flex-col h-dvh overflow-y-auto bg-white dark:bg-darkBg fixed lg:sticky lg:w-1/4  top-0 pt-28 transform transition-transform ease-in-out duration-300  ${!isOpen ? "-translate-x-full lg:translate-x-0" : "translate-x-0"} `}>
            <button className="flex items-center dark:text-white text-lg lg:hidden" onClick={()=>setIsOpen(false)}>
                <IoIosArrowForward className="rotate-180" /> Menu
            </button>
            {SidebarContent.map((section) => (
                    <div key={section.title}>
                        <Link href={section.path} className=" text-base cursor-pointer py-1 dark:text-white">{section.title}</Link>
                        <ul className="w-full text-sm pl-2 text-gray-400  flex flex-col gap-2">
                            {section.items.map((item) => (
                                <li key={item.path}><Link className="w-full cursor-pointer" href={item.path} >{item.content}</Link></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="w-full lg:w-3/4 place-content-end px-2 ">
                <div className="w-full h-20"></div>
                <button className="flex justify-center items-center py-8 dark:text-white text-lg lg:hidden" onClick={()=>setIsOpen(true)}>
                    <IoIosArrowForward/> Menu
                </button>
                <ul className="w-full flex justify-start items-center dark:text-white py-2">
                    <IoIosArrowForward className="mx-1" />
                    <li key={0} className="flex items-center  hover:text-second">
                        <Link href="/" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    <IoIosArrowForward className="mx-1" />
                    {pathSegments.map((segment, index) => {
                        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                        const label = segment
                            .split("-")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");
                        const formattedPath = path.toLowerCase().replace(/\s+/g, "-");

                        return (
                            <li key={index} className="flex items-center hover:text-second">
                                {index > 0 && <IoIosArrowForward className="mx-1" />}
                                <Link href={formattedPath} className="hover:underline">
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                    <IoIosArrowForward className="mx-1" />
                </ul>
                {children}
                
            </div>
        </div>
    );
}
