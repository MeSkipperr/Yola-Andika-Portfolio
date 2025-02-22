"use client"
import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";

const codeSyntax = `
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

const Page = () => {
    const { language } = useLanguage();
    return ( 
        <div className="w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl">Copy to Clipboard Hook</h1>
            <code>hooks/useCopy.ts</code>
            <p className="text-base">
                {language
                ? "File ini berisi custom hook yang memungkinkan pengguna menyalin teks ke clipboard dengan mudah."
                : "This file contains a custom hook that allows users to copy text to the clipboard easily."}
            </p>
            <CodeBlock content={
                [
                    {
                        code:codeSyntax,
                        language:"typescript"
                    }
                ]
            }/>
            {/* Implementation Section */}
            <h2 className="text-3xl">{language ? "Implementasi" : "Implementation"}</h2>
            
            {/* Using useCopy Hook */}
            <h3 className="text-xl">{language ? "Menggunakan useCopy Hook" : "Using useCopy Hook"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
import useCopy from "@/hooks/useCopy";

const Component = () => {
    const { copied, copyToClipboard } = useCopy("Hello, world!");
    
    return (
        <div>
            <button onClick={copyToClipboard}>Copy Text</button>
            {copied && <span>Copied!</span>}
        </div>
    );
};
                        `,
                        language:"tsx"
                    }
                ]
            }/>
            <p>{language ? "Hook" : "The hook"} <code>useCopy</code> {language ? "memungkinkan Anda menyalin teks ke clipboard dan memberi tahu pengguna ketika teks berhasil disalin." : "allows you to copy text to the clipboard and notifies the user when the text is successfully copied."}</p>
            <ul className="ml-8 list-disc">
                <li><code>text</code>: {language ? "Teks yang akan disalin ke clipboard." : "The text to be copied to the clipboard."}</li>
                <li><code>copied</code>: {language ? "Status boolean yang menunjukkan apakah teks telah disalin." : "A boolean state indicating if the text has been copied."}</li>
                <li><code>copyToClipboard</code>: {language ? "Fungsi untuk menyalin teks ke clipboard." : "Function to copy the text to the clipboard."}</li>
            </ul>
        </div>
    );
};

export default Page;
