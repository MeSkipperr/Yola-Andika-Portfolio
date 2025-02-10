"use client"

import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

const getDeviceType = (width: number): DeviceType => {
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
      return "desktop";
};

export const useIsDevice = () => {
    const [device, setDevice] = useState<DeviceType>(() => getDeviceType(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
        setDevice(getDeviceType(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return device;
};
