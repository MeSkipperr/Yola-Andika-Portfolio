"use client"

import { Suspense, useEffect, useState } from "react";
import StartCapture from "./StartCapture";
import { LAYOUT } from "../config";
import PhotoSetting from "./PhotoSetting";
import { useRouter, useSearchParams } from "next/navigation";


const PhotoBooth = () => {
    const [isConfigurationPage, setIsConfigurationPage] = useState<boolean>(false);
    const [capturedImages, setCapturedImages] = useState<{ image: string; filter: string }[]>([]);
    
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const layoutParamRaw = searchParams.get("layout");
    const isValidNumber = layoutParamRaw && !isNaN(Number(layoutParamRaw));
    
    useEffect(() => {
        if (!isValidNumber) {
            router.replace("?layout=1"); // Redirect ke layout=0 jika bukan angka
        }
    }, [isValidNumber, router]);
    
    const layoutParam = isValidNumber ? Number(layoutParamRaw) - 1 : 0;
    const layout = LAYOUT[layoutParam] || LAYOUT[0]; // Pastikan tetap valid

    const handleCapture = (image: string, filter: string) => {
        setCapturedImages((prev) => [...prev, { image, filter }]);
        console.log(capturedImages)
    };
    const handleReset = () => {
        setCapturedImages([]);
    };
    return ( 
        <div className="w-full min-h-dvh flex justify-center  px-4 py-36 bg-persianPink" >
            {isConfigurationPage
            ? <PhotoSetting  layout={layout} capturedImages={capturedImages} setIsConfigurationPage={setIsConfigurationPage}/>
            :
            <StartCapture onCapture={handleCapture} onReset={handleReset} layout={layout} capturedImages={capturedImages} setIsConfigurationPage={setIsConfigurationPage}/>
            }    
        </div>
    );

}

const PhotoBoothStart = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <PhotoBooth />
        </Suspense>
    );
};

export default PhotoBoothStart;