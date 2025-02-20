import CodeBlock from "@/components/code-block";

const sampleCode = `
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockType = {
    code: string;
    language?: string;
};

const CodeBlock = ({ language = "tsx", code }: CodeBlockType) => {
    return (
        <div className="py-4 px-1 rounded-xl shadow-md overflow-auto bg-white dark:bg-gray-900">
            <SyntaxHighlighter language={language} style={typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? dracula : solarizedlight}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;

`;

const LibraryPage = () => {
    return ( 
        <>
            <div className="w-full h-dvh px-2 ">
                <CodeBlock code={sampleCode}/>  
            </div>
            <div className="w-full h-dvh bg-persianPink"></div>
        </>
    );
}

export default LibraryPage;