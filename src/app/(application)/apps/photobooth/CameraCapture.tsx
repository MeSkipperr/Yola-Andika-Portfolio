"use client"
import { useEffect, useRef, useState } from "react";

import { FILTER } from "./config";


const CameraCapture = ({ 
    onCapture, 
    onReset 
}: { 
    onCapture: (image: string, filter: string) => void;
    onReset: () => void;
}) => {
    const [selectedFilter, setSelectedFilter] = useState<string>(FILTER[0].value);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [captureCount, setCaptureCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);

    const [isStart, setIsStart] = useState<boolean>(false);
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

        const context = canvasRef.current.getContext("2d");
        if (context) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;

            context.filter = selectedFilter;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            const imageData = canvasRef.current.toDataURL("image/png");

            onCapture(imageData, selectedFilter);
            setCaptureCount((prev) => prev + 1);
        }
    };

    const startCapture = () => {
        onReset();
        setCaptureCount(0)
        setIsStart(true);
        const lastCount = 4;
    
        const runCountdown = (iteration: number) => {
            if (iteration > lastCount) {
                setIsStart(false); // Matikan tampilan countdown setelah semua selesai
                return;
            }
    
            let count = 3;
            const interval = setInterval(() => {
                setTimer(count);
                if (count === 0) {
                    clearInterval(interval);
                    capturePhoto()
    
                    // Delay sebelum iterasi berikutnya dimulai
                    setTimeout(() => {
                        runCountdown(iteration + 1);
                    }, 1000);
                }
                count--;
            }, 1000);
        };
    
        runCountdown(1);
    };
    

    return (
        <>  
            {!isStart
            &&
            <div className="w-full flex p-2 items-center gap-2 gap-2`">
                <span className="text-persianPink  text-lg whitespace-nowrap">Camera Input :</span>
                <select
                    value={selectedDevice || ""}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="rounded cursor-pointer outline-0   "
                >
                        {devices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Kamera ${devices.indexOf(device) + 1}`}
                        </option>
                        ))}
                </select>
            </div>
            }
            <div className="w-full aspect-[4/3] object-cover rounded-md bg-amber-50 text-red-500 relative px-2">
            {error
                ? error
                : 
                <>
                    {isStart &&
                    <div
                        className={`absolute inset-0 text-white flex justify-center items-center font-bold text-9xl transition-all duration-200 ${
                            timer === 0 ? "bg-white opacity-80" : "opacity-100"
                        }`}
                        >
                        {timer}
                        </div>
                    }
                    <video ref={videoRef} autoPlay playsInline className="w-full aspect-[4/3] object-cover rounded-md bg-peachPuff" style={{ filter: selectedFilter }} />
                </>
            }
            </div>
            {!isStart
            &&
            <>
                <span className="text-white p-2 text-lg">Filter :</span>    
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className=" p-2 rounded w-full cursor-pointer text-white outline-0 bg-pastelPink"
                >
                    {FILTER.map((filter) => (
                        <option key={filter.value} value={filter.value}
                            className="py-2 hover:bg-persianPink cursor-pointer"
                        >
                            {filter.title}
                        </option>
                    ))}
                </select>
                <button 
                onClick={startCapture}
                className="bg-green-400 rounded-md mt-4  py-1 w-full  font-semibold tracking-wide text-lg text-white cursor-pointer">Start</button>
            </>
            }
        <canvas ref={canvasRef} className="hidden" />
        </>
    );
}

export default CameraCapture;