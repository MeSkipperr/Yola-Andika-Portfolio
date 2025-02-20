"use client";
import { useDarkMode } from "@/context/DarkModeContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula,vs  } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdOutlineContentCopy } from "react-icons/md";
import useCopy from "@/hooks/useCopy";

type CodeBlockType = {
    code: string;
    language?: string;
};

const CodeBlock = ({ language = "tsx", code }: CodeBlockType) => {
    const { isDarkMode } = useDarkMode();
    const { copied, copyToClipboard } = useCopy(code);

    return (
        <div className="relative flex h-auto w-full   flex-col justify-center items-center px-1 rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-auto bg-white dark:bg-darkBg">
            <div className="w-full  text-lg px-2 p-1 flex justify-between dark:text-white items-center">
                <span className="text-base">{language}</span>
                <button onClick={copyToClipboard}>
                    {copied
                    ? <p className="text-sm">Copied..</p> 
                    : <MdOutlineContentCopy />         
                    }
                </button>
            </div>
            <div className="w-full relative overflow-x-auto">
                    <SyntaxHighlighter 
                        language={language} 
                        style={isDarkMode ? dracula : vs}
                        customStyle={{ fontSize: "14px", width: "100%" ,overflowX:"auto"}} 
                    >
                        {code}
                    </SyntaxHighlighter>
            </div>

        </div>
    );
};

export default CodeBlock;
