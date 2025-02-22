"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useDarkMode } from "@/context/DarkModeContext";

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

type CodeBlockContent = {
    language: string;
    code: string;
    fileName?: string;
};

type CodeBlockProps = {
    content: CodeBlockContent[];
    className?: string;
    theme?: "dark" | "light";
    style?: React.CSSProperties;
    fontSize?: string;
    highlightFile?:string;
};

const shortLanguage: { [key: string]: string } = {
    javascript: "js",
    typescript: "ts",
};

const defaultStyles: { [key: string]: React.CSSProperties } = {
    container: {
        position: "relative",
        width: "100%",
        borderRadius: "4px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        overflow: "auto",
    },
    darkMode: {
        backgroundColor: "#202025",
        color: "white",
    },
    lightMode: {
        backgroundColor: "#fff",
        color: "black",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        fontSize: "14px",
    },
    button: {
        padding: "6px 12px",
        fontSize: "14px",
        cursor: "pointer",
        background: "none",
        border: "none",
    },
};

const CodeBlock: React.FC<CodeBlockProps> = ({
    content,
    className = "",
    theme ,
    style = {},
    fontSize = "14px",
    highlightFile = "#06a4ff"
}) => {
    const [contentIndex, setContentIndex] = useState<number>(0);
    const { copied, copyToClipboard } = useCopy(content[contentIndex].code);
    const { isDarkMode } = useDarkMode();

    const appliedTheme = theme 
    ? theme === "dark" 
        ? dracula 
        : vs 
    : isDarkMode 
        ? dracula 
        : vs;

    const combinedStyles: React.CSSProperties = {
        ...defaultStyles.container,
        ...(theme 
            ? theme === "dark" 
                ? defaultStyles.darkMode 
                : defaultStyles.lightMode 
            : isDarkMode 
                ? defaultStyles.darkMode 
                : defaultStyles.lightMode),        
        ...style,
    };

    return (
        <div style={combinedStyles} className={className}>
            <div style={defaultStyles.header}>
                <div style={{ display: "flex", overflowX: "auto" }}>
                    {content.map((data, index) => (
                        <button
                            key={index}
                            style={{
                                ...defaultStyles.button,
                                textDecoration: index === contentIndex ? "underline" : "none",
                                color: index === contentIndex ? highlightFile : "",
                                fontSize:fontSize
                            }}
                            onClick={() => setContentIndex(index)}
                        >
                            <code>{data.fileName || shortLanguage[data.language] || data.language}</code>
                        </button>
                    ))}
                </div>
                <button onClick={copyToClipboard} style={{ ...defaultStyles.button, fontSize: fontSize }}>
                    {copied ? <IoCheckmarkDoneOutline /> : <MdOutlineContentCopy />}
                </button>
            </div>
            <SyntaxHighlighter
                language={content[contentIndex].language || "tsx"}
                style={appliedTheme}
                customStyle={{ fontSize, width: "100%", overflowX: "auto" }}
            >
                {content[contentIndex].code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
