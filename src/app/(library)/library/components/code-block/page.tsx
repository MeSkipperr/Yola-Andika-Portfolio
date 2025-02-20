"use client"
import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";

const codeSyntax = `
"use client";
import { useDarkMode } from "@/context/DarkModeContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
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
        <div className="relative flex h-auto w-full flex-col justify-center items-center px-1 rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-auto bg-white dark:bg-darkBg">
            <div className="w-full text-lg px-2 p-1 flex justify-between dark:text-white items-center">
                <span className="text-base">{language}</span>
                <button onClick={copyToClipboard}>
                    {copied ? <p className="text-sm">Copied..</p> : <MdOutlineContentCopy />}
                </button>
            </div>
            <div className="w-full relative overflow-x-auto">
                <SyntaxHighlighter 
                    language={language} 
                    style={isDarkMode ? dracula : vs}
                    customStyle={{ fontSize: "14px", width: "100%", overflowX: "auto" }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;
`;

const Page = () => {
    const { language } = useLanguage();
    return ( 
        <div className="w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl">Code Block Component</h1>
            <code>components/code-block.tsx</code>
            <p className="text-base">
                {language
                ? "File ini berisi komponen CodeBlock yang digunakan untuk menampilkan potongan kode dengan penyorotan sintaks dan tombol salin ke clipboard."
                : "This file contains the CodeBlock component used to display code snippets with syntax highlighting and a copy-to-clipboard button."}
            </p>
            <CodeBlock language="tsx" code={codeSyntax}/>
            
            {/* Usage Example */}
            <h2 className="text-3xl">{language ? "Implementasi" : "Implementation"}</h2>
            <h3 className="text-xl">{language ? "Menggunakan CodeBlock dalam komponen lain" : "Using CodeBlock in another component"}</h3>
            <CodeBlock language="tsx" code={`<CodeBlock language="tsx" code={\"const message = 'Hello, world!'; console.log(message);\"} />`}/>
            <p>{language ? "Komponen" : "The"} <code>CodeBlock</code> {language ? "dapat digunakan untuk menampilkan kode dengan tampilan yang menarik dan fitur salin cepat." : "component can be used to display code with a clean look and quick copy feature."}</p>
            <ul className="ml-8 list-disc">
                <li><code>language</code>: {language ? "Bahasa sintaks yang akan disorot." : "The syntax language to highlight."}</li>
                <li><code>code</code>: {language ? "Kode yang akan ditampilkan." : "The code snippet to be displayed."}</li>
            </ul>
        </div>
    );
};

export default Page;
