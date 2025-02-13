"use client";

import Link from "next/link";

type TextCard = {
    title: string;
    text: string;
    url: string;
};

type TextCardProps = {
    data: TextCard[];
};

const TextCardList = ({ data }: TextCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
                <div 
                    key={index} 
                    className="flex flex-col w-full shadow-md dark:shadow-neutral-900 px-4 py-2 rounded-md my-4 bg-white dark:bg-neutral-800"
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
    );
};

export default TextCardList;
