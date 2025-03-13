"use client"

import React, { useRef, useState } from "react";
import { SyncLoader } from "react-spinners";
import { BORDER_COLOR, LayoutType, TEXT_COLOR } from "../config";
import ColorPicker from "./ColorPicker";
import Image from "next/image";
import html2canvas from "html2canvas";

type PhotoSettingProps = {
    capturedImages: { image: string; filter: string }[];
    layout: LayoutType;
    setIsConfigurationPage: (value: boolean) => void;
}

const PhotoSetting = ({ capturedImages, layout, setIsConfigurationPage }: PhotoSettingProps) => {
    const divRef = useRef<HTMLDivElement | null>(null);

    const [colorOutline, setColorOutline] = useState("#ffffff");
    const [colorText, setColorText] = useState("#000");
    const [text, setText] = useState<string>("Photobooth");
    const [processing, setProcessing] = useState(false);
    const [images, setImages] = useState(capturedImages);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    // Drop gambar ke posisi baru
    const handleDrop = (targetIndex: number) => {
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const newImages = [...images];
        [newImages[draggedIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[draggedIndex]];

        setImages(newImages);
        setDraggedIndex(null);
    };



    const handleGenerateAndDownload = async () => {
        if (!divRef.current) return;

        setProcessing(true); // 🚀 Mulai proses
        try {
            const canvas = await html2canvas(divRef.current);
            const imageURL = canvas.toDataURL("image/png");

            // 🔽 **Trigger otomatis download**
            const link = document.createElement("a");
            link.href = imageURL;
            link.download = "photobooth - by @kdk.yolaandika.png";
            link.click();
        } catch (error) {
            console.error("Error generating image:", error);
        }
        setProcessing(false); // ✅ Selesai
    };

    return (
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row lg:h-dvh   gap-2 lg:p-8 relative">
            {processing &&
                <div className="absolute inset-0 flex justify-center items-center">
                    <SyncLoader color="#fff" size={30} />
                </div>
            }
            <div className="w-full lg:w-1/4 lg:h-full  flex flex-col justify-between  text-persianPink  tracking-wide bg-white py-4 px-4 rounded-md">
                <div className="w-full flex flex-col gap-2 ">
                    <span onClick={() => setIsConfigurationPage(false)} className="underline cursor-pointer">Back</span>
                    <h1 className="text-5xl">
                        Finish Your Photo
                    </h1>
                    <div className="w-full h-auto border border-persianPink rounded-full "></div>
                    <h3>Border Color</h3>
                    <ul className=" h-16  w-full flex  items-center  gap-2 overflow-x-auto">
                        <ColorPicker setColorOutline={setColorOutline} />
                        {BORDER_COLOR.map((color, index) => (
                            <li
                                key={index}
                                className="h-full aspect-square rounded-full border cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => setColorOutline(color)}
                            ></li>
                        ))}
                    </ul>
                    <h3>Text</h3>
                    <input type="text" className="h-10 w-full border rounded-md outline-none px-2" value={text} onChange={(e) => setText(e.target.value)} />
                    <h3>Border Color</h3>
                    <ul className=" h-16 w-full flex  items-center  gap-2 overflow-x-auto">
                        <ColorPicker setColorOutline={setColorText} />
                        {TEXT_COLOR.map((color, index) => (
                            <li
                                key={index}
                                className="h-full aspect-square rounded-full border cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => setColorText(color)}
                            ></li>
                        ))}
                    </ul>
                </div>
                <div className="w-full flex justify-between pt-4">
                    <a href="https://www.instagram.com/kdk.yolaandika/" target="_blank" rel="noopener noreferrer" >
                        <button className="py-2 px-4 rounded-md text-persianPink font-semibold text-sm bg-lavenderPink" >Follow Instagram</button>
                    </a>
                    <button className="py-2 px-4 rounded-md text-white text-sm bg-green-400 font-semibold" onClick={handleGenerateAndDownload}>Download</button>
                </div>
            </div>
            <div className="w-full h-full lg:px-2  overflow-y-auto flex justify-center" >
                <div ref={divRef} className="w-full p-4 pb-10 bg-white rounded-md" style={{ backgroundColor: colorOutline }}>
                    {layout && (
                        <div className={` ${layout.layout.parent} gap-2 pb-8  mx-auto`}>
                            {Array.from({ length: layout.content }, (_, index) => (
                                <div
                                    key={`content-${index}`}
                                    className={`w-full aspect-[4/3] bg-lavenderPink  ${index === 0 && layout.layout.child} `}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDrop(index)}
                                >
                                    {images[index] && (
                                        <Image
                                            src={images[index].image}
                                            width={1000}
                                            height={1000}
                                            alt={`Image Content : ${index}`}
                                            className={`w-full aspect-[4/3] h-auto ${images[index].filter}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <h1 className="fontKaftan flex justify-center items-center tracking-wider text-xl lg:text-4xl" style={{ color: colorText }}>
                        {text}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default PhotoSetting;