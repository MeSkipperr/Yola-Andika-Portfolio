"use client"

import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";

const codeSyntax = `
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
`;

const Page = () => {
    const { language } = useLanguage();
    return ( 
        <div className="w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl">useIsDevice Hook</h1>
            <code>hooks/useIsDevice.ts</code>
            <p className="text-base">
                {language
                ? "Hook ini digunakan untuk mendeteksi jenis perangkat berdasarkan lebar layar."
                : "This hook is used to detect the device type based on screen width."}
            </p>
            <CodeBlock language="typescript" code={codeSyntax} />

            {/* Usage Section */}
            <h2 className="text-3xl">{language ? "Implementasi" : "Implementation"}</h2>
            <h3 className="text-xl">{language ? "Menggunakan hook di dalam komponen" : "Using the hook inside a component"}</h3>
            <CodeBlock language="typescript" code={`
import { useIsDevice } from "@/hooks/useIsDevice";

const Component = () => {
    const device = useIsDevice();
    return <p>Device type: {device}</p>;
};
`} />
            <p>{language ? "Hook" : "The hook"} <code>useIsDevice</code> {language ? "mengembalikan jenis perangkat yang sedang digunakan." : "returns the current device type."}</p>
            <ul className="ml-8 list-disc">
                <li>{language ? "Mengembalikan salah satu dari \"mobile\", \"tablet\", atau \"desktop\"." : "Returns one of 'mobile', 'tablet', or 'desktop'."}</li>
            </ul>
        </div>
    );
};

export default Page;
