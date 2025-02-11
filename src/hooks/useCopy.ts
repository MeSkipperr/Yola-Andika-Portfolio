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