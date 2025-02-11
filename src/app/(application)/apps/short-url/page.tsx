"use client"
import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

import useCopy from "@/hooks/useCopy";
import { usePathname } from "next/navigation";
import axios from "axios";
import { isValidURL } from "@/utils/validator";

const ShortUrl = () => {
    const [url, setUrl] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const [shortUrl, setShortUrl] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pathname = usePathname();

    const handleSubmit = async () => {
        setShortUrl("");
        setIsLoading(true)
        try {
            if (!url.trim()) {
                setErrorMessage("URL cannot be empty");
                return;
            }
            if (!isValidURL(url)) {
                setErrorMessage("Invalid URL format");
                return;
            }
            const response = await axios.post("/api/apps/short-url", { url }, {
                headers: { Authorization: process.env.NEXT_PUBLIC_API_KEY },
            });

            if (response.status !== 200) {
                setErrorMessage("Error invalid data");
                return;
            }

            const fullUrl = `${window.location.origin}${pathname}`;
            setShortUrl(`${fullUrl}/${response.data.urlData.hex}`);
            setActive(true);
            setErrorMessage(""); // Clear error if successful
        } catch (error) {
            console.error("Error creating short URL:", error);
            setErrorMessage("Failed to generate short URL");
        }finally{
            setIsLoading(false)
        }
    };

    const { copied, copyToClipboard } = useCopy(shortUrl);

    return (
        <div className="w-full h-dvh bg-primary flex justify-center items-center flex-col px-2 gap-4">
            <div className="w-full lg:w-1/4 flex justify-center items-center flex-col">
                <h1 className="text-2xl font-semibold">SHORT URL</h1>
                <div className="flex w-full items-center justify-center gap-2">
                    <input
                        type="text"
                        placeholder="Your url.."
                        className="w-3/4 h-full px-2 border-b-2 border"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={` ${isLoading&& "opacity-50"} cursor-pointer size-14 text-3xl p-4 flex justify-center items-center bg-second text-white rounded-lg`}
                    >
                        <HiPaperAirplane />
                    </button>
                </div>
                <p className="text-sm text-red-500">{errorMessage}</p>
                {active && <FaArrowDown />}
                <div className={`${active ? "flex" : "hidden"} w-full transition-all items-center justify-center gap-2`}>
                    <input
                        type="text"
                        placeholder="Short url"
                        className="w-3/4 h-full px-2 border-b-2 border"
                        disabled
                        value={shortUrl}
                    />
                    <button
                        onClick={copyToClipboard}
                        className="cursor-pointer size-14 text-3xl p-4 flex justify-center items-center bg-third text-white rounded-lg"
                    >
                        {copied ? <IoMdCheckmark /> : <MdContentCopy />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShortUrl;
