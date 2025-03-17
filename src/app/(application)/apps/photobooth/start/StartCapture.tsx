"use client"
import { useEffect, useMemo, useRef, useState } from "react";
import { FILTER, LayoutType } from "../config";
import Image from "next/image";
import Link from "next/link";


type StartCaptureProps = {
    onCapture: (image: string, filter: string) => void;
    onReset: () => void;
    layout:LayoutType;
    capturedImages:{ image: string; filter: string }[];
    setIsConfigurationPage: (value: boolean) => void;
};


const StartCapture = ({ onCapture, onReset, layout,capturedImages ,setIsConfigurationPage}: StartCaptureProps) => {
    const [isStart, setIsStart] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState<string>(FILTER[0].value);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);


    const [timer, setTimer] = useState(3);

    // **🔍 Mengambil daftar kamera yang tersedia**
    useEffect(() => {
        const getCameras = async () => {
            try {
                // 🔹 Minta izin akses kamera terlebih dahulu
                await navigator.mediaDevices.getUserMedia({ video: true });

                // 🔹 Setelah izin diberikan, baru ambil daftar perangkat
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter((device) => device.kind === "videoinput");


                if (videoDevices.length === 0) {
                    setError("Tidak ada kamera yang tersedia.");
                    return;
                }

                setDevices(videoDevices);
                setSelectedDevice(videoDevices[0].deviceId);
            } catch (err) {
                console.error("Error getting cameras:", err);
                setError("Gagal mendapatkan daftar kamera. Periksa izin di pengaturan browser.");
            }
            if (!navigator.mediaDevices?.enumerateDevices) {
                setError("Browser tidak mendukung enumerasi perangkat.");
                return;
            }
        };

        getCameras();
    }, []);

    useEffect(() => {
        const requestCameraPermission = async () => {
            try {
                // 🔹 Minta izin dulu
                await navigator.mediaDevices.getUserMedia({ video: true });

                // 🔹 Setelah izin diberikan, ambil daftar kamera
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter((device) => device.kind === "videoinput");

                if (videoDevices.length === 0) {
                    setError("Tidak ada kamera yang tersedia.");
                    return;
                }

                setDevices(videoDevices);
                setSelectedDevice(videoDevices[0].deviceId);
            } catch (err) {
                console.error("Gagal mendapatkan izin kamera:", err);
                setError("Akses kamera diblokir! Silakan periksa pengaturan browser.");
            }
        };

        requestCameraPermission();
    }, []);




    // **📸 Mengaktifkan kamera berdasarkan deviceId yang dipilih**
    useEffect(() => {
        if (!selectedDevice) return;

        let timeoutId: NodeJS.Timeout;

        const startCamera = async () => {
            try {
                // **🛑 Hentikan stream lama sebelum memulai stream baru**
                if (currentStream) {
                    currentStream.getTracks().forEach((track) => track.stop());
                }

                // **🕐 Beri waktu tambahan sebelum memulai kamera**
                timeoutId = setTimeout(async () => {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: { deviceId: selectedDevice, aspectRatio: 1 },
                        });

                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }

                        setCurrentStream(stream);
                        setError(null); // Reset error jika kamera berhasil diaktifkan
                    } catch (err) {
                        console.error("Camera error:", err);
                        setError("Gagal mengakses kamera. Coba periksa izin atau gunakan perangkat lain.");
                    }
                }, 500); // **⏳ Delay 500ms sebelum memulai kamera ulang**

            } catch (err) {
                setError("Kamera tidak bisa diakses.");
                console.error("Camera startup error:", err);
            }
        };

        startCamera();

        return () => {
            clearTimeout(timeoutId);
            if (currentStream) {
                currentStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [selectedDevice]);

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
    
        const context = canvasRef.current.getContext("2d", { willReadFrequently: true });
        if (context) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
    
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
    
            context.save(); // Simpan state sebelum transformasi
            context.translate(canvas.width, 0); // Geser ke kanan
            context.scale(-1, 1); // Flip horizontal (Mirror)
    
            // ✅ Terapkan filter langsung ke context sebelum menggambar
            context.filter = selectedFilter || "none"; 
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
            context.restore(); // Kembalikan transformasi agar tidak mempengaruhi gambar lain
    
            const imageData = canvas.toDataURL("image/png");
            onCapture(imageData, selectedFilter);
        }
    };
    
    
    

    const startCapture = () => {
        onReset();
        setIsStart(true);

        const runCountdown = (iteration: number) => {
            if (iteration > layout.content) {
                setIsStart(false);
                return;
            }

            let count = 3;
            const interval = setInterval(() => {
                setTimer(count);
                if (count === 0) {
                    clearInterval(interval);
                    capturePhoto()

                    setTimeout(() => {
                        runCountdown(iteration + 1);
                    }, 1000);
                }
                count--;
            }, 1000);
        };

        runCountdown(1);
    };

    const renderedContent = useMemo(() => {
        return Array.from({ length: layout.content }, (_, index) => (
            <div key={`content-${index}`} className={`w-full aspect-[4/3] bg-lavenderPink ${index === 0 && layout.layout.child}`}>
                {capturedImages?.[index]?.image && (
                    <Image
                        src={capturedImages[index].image}
                        width={1000}
                        height={1000}
                        alt={`Image Content : ${index}`}
                        className={`w-full aspect-[4/3] h-auto ${capturedImages[index].filter || ''}`}
                        loading="lazy"
                    />
                )}
            </div>
        ));
    }, [layout, capturedImages]);

    return (
        <div className="w-full lg:w-3/4 h-3/4  flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2 flex flex-col justify-around items-start h-full bg-white rounded-md shadow-[0_3px_10px_#ffffff]">
                {!isStart
                    &&
                    <div className="w-full flex p-2 items-center gap-2 ">
                        <span className="text-persianPink  text-lg lg:text-xl whitespace-nowrap">Camera Input :</span>
                        <select
                            value={selectedDevice || ""}
                            onChange={(e) => setSelectedDevice(e.target.value)}
                            className="rounded cursor-pointer outline-0 w-full lg:text-xl  "
                        >
                            {devices.map((device) => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Kamera ${devices.indexOf(device) + 1}`}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                <div className="w-full aspect-[4/3] object-cover rounded-md  text-red-500 relative px-2">
                    {error
                        ? error
                        :
                        <>
                            {isStart &&
                                <div
                                    className={`absolute z-20 inset-0 text-white flex justify-center items-center font-bold text-9xl transition-all duration-200 ${timer === 0 ? "bg-white opacity-80" : "opacity-100"
                                        }`}
                                >
                                    {timer}
                                </div>
                            }
                            <video ref={videoRef} autoPlay playsInline className="w-full aspect-[4/3] object-cover rounded-md bg-peachPuff scale-x-[-1]" style={{ filter: selectedFilter }} />
                        </>
                    }
                </div>
                {!isStart
                    &&
                    <div className="p-2 bg-white flex  w-full gap-2">
                        <div className="w-full flex items-center gap-2 justify-between">
                            <span className="text-persianPink text-lg text-nowrap lg:text-xl">Filter :</span>
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className=" p-2 rounded w-full cursor-pointer text-persianPink outline-0 bg-pastelPink lg:text-xl"
                            >
                                {FILTER.map((filter) => (
                                    <option key={filter.value} value={filter.value}
                                        className="py-2 cursor-pointer"
                                    >
                                        {filter.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {!isStart && <button className="py-2 px-4 rounded-md text-white text-lg bg-green-400 " onClick={startCapture}>Start</button>}
                        
                    </div>
                    
                }
                {capturedImages.length === layout.content  &&
                    <div className="flex justify-between items-center w-full gap-2 p-2">
                            <button className="py-2 px-4 rounded-md text-white text-lg bg-red-500" onClick={onReset}>Delete</button>
                            <button className="py-2 px-4 rounded-md text-white text-lg bg-persianPink" onClick={()=>setIsConfigurationPage(true)} >Next</button>
                    </div>
                }
                <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="w-full h-auto border border-persianPink rounded-full lg:w-auto lg:h-full"></div>
            <div className="w-full lg:w-1/2  flex flex-col justify-center items-center bg-white rounded-md shadow-[0_3px_10px_#ffffff] p-4 gap-2">
                <Link href="/apps/photobooth" className="w-full underline ">Change Layout</Link>
                <div className="w-full rounded-md overflow-y-auto border flex justify-center items-start">
                    {layout && 
                        <div className={`w-full ${layout.layout.parent} gap-2 pb-8`}>
                        {renderedContent}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default StartCapture;