"use client"

import { useState } from "react";
import CameraCapture from "./CameraCapture";

const PhotoBooth = () => {
    const [capturedImages, setCapturedImages] = useState<{ image: string; filter: string }[]>([]);

    const handleCapture = (image: string, filter: string) => {
        setCapturedImages((prev) => [...prev, { image, filter }]);
        console.log(capturedImages)
    };
    const handleReset = () => {
        setCapturedImages([]);
    };
    return ( 
        <div className="w-full h-dvh flex justify-center items-center px-4" style={{ backgroundImage: "url('/background/blurry-white-pink.svg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="w-full h-1/2 bg-white text-persianPink rounded-md shadow-[0_3px_10px_#fffff]">
                <CameraCapture onCapture={handleCapture} onReset={handleReset} />
            </div>
        </div>
    );
}

export default PhotoBooth;