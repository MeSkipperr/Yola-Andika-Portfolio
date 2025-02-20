"use client"
import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";

const sampleCode = `
import { useState } from "react";

const useCopy = (text: string) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Gagal menyalin teks", err);
        }
    };

    return { copied, copyToClipboard };
};

export default useCopy;
`;

const LibraryPage = () => {
    const { language } = useLanguage();
    return ( 
        <div className="w-full px-4 py-6 space-y-4">
            <h1 className="text-4xl">useCopy</h1>
            <p className="text-base text-gray-700 dark:text-gray-300">
                <code>useCopy</code> {language
                ? "adalah custom hook React untuk menyalin teks ke clipboard dan memberi umpan balik kepada pengguna apakah teks berhasil disalin atau tidak."
                : "is a custom React hook to copy text to the clipboard and give feedback to the user whether the text was successfully copied or not."}
            </p>
            
            <h2 className="text-2xl">{language ? "Penggunaan" : "Usage"}</h2>
            <p className="text-base">
                {language ? "Import hook ke dalam komponen yang membutuhkan fungsi copy ke clipboard."
                : "Import the hook into the component that needs the copy-to-clipboard function."}
            </p>
            <CodeBlock code={sampleCode} language="typescript" />
            
            <h2 className="text-2xl">{language ? "Contoh Implementasi" : "Example Implementation"}</h2>
            <CodeBlock 
                code={`
import React from "react";
import useCopy from "./useCopy";

const Example = () => {
    const { copied, copyToClipboard } = useCopy("Hello, World!");
    
    return (
        <div>
            <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded">
                {copied ? "Copied!" : "Copy Text"}
            </button>
        </div>
    );
};

export default Example;
                `} 
                language="typescript" 
            />
        </div>
    );
};

export default LibraryPage;
