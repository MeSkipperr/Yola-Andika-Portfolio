"use client"

import React, { useEffect, useRef, useState } from "react";
import { SyncLoader } from "react-spinners";
import { BORDER_COLOR, LayoutType, TEXT_COLOR } from "../config";
import ColorPicker from "./ColorPicker";
import Image from "next/image";
import html2canvas from "html2canvas";
import axios from "axios";


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
    const [userEmail, setUserEmail] = useState<string>("");
    const [sendEmailIsLoading, setSendEmailIsLoading] = useState<boolean>(false);

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

    const hasSentEmail = useRef(false); // 🔽 Menyimpan status apakah email sudah dikirim

    const handleSendEmail = async (userEmail?: string) => {
        if(userEmail || userEmail?.trim()=== ""){
            setSendEmailIsLoading(true)
        }
    
        try {
            const canvas = await html2canvas(divRef.current as HTMLDivElement);
    
            // 🔽 Konversi ke Blob
            const blob = await new Promise<Blob | null>((resolve) =>
                canvas.toBlob(resolve, "image/png")
            );
    
            if (!blob) {
                throw new Error("Failed to generate image");
            }
    
            const file = new File([blob], "photobooth.png", { type: "image/png" });
    
            // 🔽 Buat FormData
            const formData = new FormData();
            formData.append("file", file);
            if (userEmail) formData.append("email", userEmail); // Tambahkan email jika ada
    
            // 🔽 Kirim ke API
            await axios.post("/api/apps/photobooth", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
        } catch (error) {
            console.error("Error sending image:", error);
        }finally{
            setSendEmailIsLoading(false)
        }
    };

    useEffect(() => {
        if (hasSentEmail.current) return; // 🔽 Cegah pemanggilan ulang
        hasSentEmail.current = true; // ✅ Tandai sebagai sudah dikirim
    
        handleSendEmail();
    }, []); // 🔽 Dependency array kosong → hanya dijalankan sekali
    

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

    const handleShareImage = async () => {
        if (!divRef.current) return;
        
        setProcessing(true); // 🚀 Mulai proses
        try {
            const canvas = await html2canvas(divRef.current);
    
            // 🔽 Ubah ke Promise untuk menangani Blob dengan benar
            const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    
            if (!blob) {
                throw new Error("Failed to generate image");
            }
    
            const file = new File([blob], "photobooth.png", { type: "image/png" });
    
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Photobooth by @kdk.yolaandika",
                    text: "Check out my photobooth creation!",
                });
            } else {
                alert("Sharing is not supported on this device.");
            }
        } catch (error) {
            console.error("Error sharing image:", error);
        }
        setProcessing(false); // ✅ Selesai
    };



    return (
        <div className="w-full  lg:w-3/4 flex flex-col lg:flex-row    gap-2 lg:p-8 relative">
            {processing &&
                <div className="absolute inset-0 flex justify-center items-center">
                    <SyncLoader color="#fff" size={30} />
                </div>
            }
            <div className="w-full lg:w-[35%] sm:w-1/2  h-fit  flex flex-col justify-between  text-[#7E074A]  tracking-wide bg-white py-4 px-4 rounded-md">
                <div className="w-full flex flex-col gap-2 ">
                    <span onClick={() => setIsConfigurationPage(false)} className="underline cursor-pointer">Back</span>
                    <h1 className="text-5xl">
                        Finish Your Photo
                    </h1>
                    <div className="w-full h-auto border border-persianPink rounded-full mb-4"></div>
                    <h3>Border Color</h3>
                    <ul className="  w-full flex flex-wrap items-center  gap-2 relative">
                        <ColorPicker setColorOutline={setColorOutline} />
                        {BORDER_COLOR.map((color, index) => (
                            <li
                                key={index}
                                className="h-10 aspect-square rounded-full border cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => setColorOutline(color)}
                            ></li>
                        ))}
                    </ul>
                    <h3>Text</h3>
                    <input type="text" className="h-10 w-full border rounded-md outline-none px-2 placeholder:text-persianPink" placeholder="Photobooth" value={text==="Photobooth"?"":text} onChange={(e) => setText(e.target.value)} />
                    <h3>Text Color</h3>
                    <ul className="w-full flex flex-wrap items-center  gap-2">
                        <ColorPicker setColorOutline={setColorText} />
                        {TEXT_COLOR.map((color, index) => (
                            <li
                                key={index}
                                className="h-10 aspect-square rounded-full border cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => setColorText(color)}
                            ></li>
                        ))}
                    </ul>
                </div>
                <div className="w-full flex flex-col justify-between pt-4 gap-2">

                        <button className="py-2 px-4 rounded-md text-white text-sm bg-green-400 font-semibold" onTouchStart={() => {}} onClick={() => handleShareImage()}>Share</button>
                        <button className="py-2 px-4 rounded-md text-white text-sm bg-green-400 font-semibold" onClick={handleGenerateAndDownload}>Download</button>
                    {/* <div className="flex gap-2">
                    </div> */}
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <h3>Email</h3>
                    <input type="text" className="h-10 w-full border rounded-md outline-none px-2 placeholder:text-persianPink" placeholder="jhon@example.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <button className="py-2 w-full rounded-md text-white text-sm bg-green-400 font-semibold" disabled={sendEmailIsLoading} onClick={() => handleSendEmail(userEmail)}>{sendEmailIsLoading?"Loading...":"Send To Email"}</button>
                    <a href="https://www.instagram.com/kdk.yolaandika/" target="_blank" rel="noopener noreferrer" >
                        <button className="py-2 px-4 rounded-md text-persianPink font-semibold text-sm bg-lavenderPink" >Follow Instagram</button>
                    </a>
                </div>
            </div>
            <div className="w-full h-auto lg:px-2   flex justify-center " >
                <div ref={divRef} className="w-full p-4 pb-10 bg-white rounded-md h-fit  shadow-[0_3px_10px_rgb(0,0,0,0.2)]" style={{ backgroundColor: colorOutline }}>
                    {layout && (
                        <div className={` ${layout.layout.parent} gap-2 pb-8  mx-auto  h-fit`}>
                            {Array.from({ length: layout.content }, (_, index) => (
                                <div
                                    key={`content-${index}`}
                                    className={`w-full aspect-[4/3] bg-lavenderPink ${index === 0 && layout.layout.child} `}
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