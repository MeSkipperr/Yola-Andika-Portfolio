"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TextCard = {
    title: string;
    text: string;
    url: string;
};

type TextCardProps = {
    data: TextCard[];
};

type SelectItem = {
    title:string;
    text:string;
    url:string
}

const TextCardList = ({ data }: TextCardProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<SelectItem>();

    useEffect(() => {
        document.body.style.overflow = `${isOpen?"hidden":"auto"}`;
        console.log(selectItem)
        
        return () =>{
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col w-full shadow-md dark:shadow-neutral-900 px-4 py-2 rounded-md my-4 bg-white dark:bg-neutral-800 cursor-pointer"
                        onClick={()=>{
                            setIsOpen(true);
                            setSelectItem(data[index])
                        }}
                    >
                        <p className="text-xl font-semibold dark:text-gray-300">{item.title}</p>
                        <span className="border w-full my-1 border-gray-400 dark:border-gray-600"></span>
                        <p className="w-full text-justify line-clamp-2 text-gray-600 dark:text-gray-300">
                            {item.text}
                        </p>
                        <ul className="w-full flex items-center justify-end py-4 text-gray-700 dark:text-gray-300">
                            <li className="hover:underline cursor-pointer hover:text-second">Details</li>
                            <li className="h-full border-gray-400 dark:border-gray-600 border mx-4"></li>
                            <li className="hover:underline cursor-pointer hover:text-second">
                                <Link className="w-full" href={item.url}>
                                    Try Now
                                </Link>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
            {isOpen &&
                <div className="absolute inset-0  bg-primary flex justify-center ">
                    <div className="w-full lg:w-1/2  bg-primary py-4 px-4  flex items-center flex-col">
                        <span className="w-full flex justify-end text-red-500 text-2xl font-bold cursor-pointer" 
                        onClick={()=>setIsOpen(false)}
                        >x</span>
                        <p className="text-xl font-semibold dark:text-gray-300">{selectItem?.title}</p>
                        <span className="border w-full my-1 border-gray-400 dark:border-gray-600"></span>
                        <p className="w-full text-justify line-clamp-2 text-gray-600 dark:text-gray-300">
                            {selectItem?.text}
                        </p>
                        <ul className="w-full flex items-center justify-end py-4 text-gray-700 dark:text-gray-300">
                            <li className="hover:underline cursor-pointer hover:text-second">
                                <Link className="w-full" href={selectItem?.url || ""}>
                                    Try Now
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </>
    );
};

export default TextCardList;
