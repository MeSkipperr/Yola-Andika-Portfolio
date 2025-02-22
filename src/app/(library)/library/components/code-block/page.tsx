"use client"
import CodeBlock from "@/components/code-block";
import UIShowing from "@/components/ui-showing";
import { useLanguage } from "@/context/Language";

const content = [
    {
        language: "javascript",
        code: `
console.log("Hello World")
        `,
        fileName: "fileName.js"
    },
]

const Page = () => {
    const { language } = useLanguage();
    return ( 
        <div className="w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl">Code Block Component</h1>
            <code>components/code-block.tsx</code>
            <UIShowing>
                <CodeBlock content={content} />
            </UIShowing>
            
            {/* Section: Usage */}
            <h2 className="text-3xl">{language ? "Cara Penggunaan" : "Usage"}</h2>
            <p>
                {language ? "Berikut adalah contoh penggunaan " : "Here is an example of how to use "} 
                <code>CodeBlock</code> {language ? "di dalam file" : " in a file "} <code>.tsx</code>.
            </p>
            <CodeBlock content={[{
                language: "jsx",
                code: `
<CodeBlock 
    content=[
        {
            code: "const user = getLocalStorage<{ id: number; name: string }>("user");\nconsole.log(user);",
            language: "typescript",
            fileName: "localStorage.ts"
        }
    ]
/>
                `,
                fileName: "example.tsx"
            }]} />
            <p>
                {language ? "Kode di atas akan menampilkan blok kode dengan syntax highlighting untuk TypeScript, serta menampilkan nama file " : "The above code will display a code block with TypeScript syntax highlighting and show the file name "}
                <code>localStorage.ts</code>.
            </p>
            
            {/* Section: Parameters Explanation */}
            <h2 className="text-3xl">{language ? "Parameter dan Fungsinya" : "Parameters and Their Functions"}</h2>
            <ul className="list-disc pl-5">
                <li>
                    <code>content</code> - {language ? "Array berisi objek kode yang akan ditampilkan." : "An array containing code objects to be displayed."}
                </li>
                <li>
                    <code>className</code> - {language ? "Menambahkan class tambahan untuk styling kustom." : "Adds an extra class for custom styling."}
                </li>
                <li>
                    <code>theme</code> - {language ? "Menentukan tema tampilan kode (dark atau light)." : "Defines the code block theme (dark or light)."}
                </li>
                <li>
                    <code>style</code> - {language ? "Menambahkan styling inline ke komponen." : "Adds inline styling to the component."}
                </li>
                <li>
                    <code>fontSize</code> - {language ? "Menentukan ukuran font dalam blok kode." : "Defines the font size in the code block."}
                </li>
            </ul>
            
            {/* Section: Example with Additional Props */}
            <h2 className="text-3xl">{language ? "Contoh Penggunaan dengan Properti Tambahan" : "Example Usage with Additional Properties"}</h2>
            <CodeBlock content={[{
                language: "tsx",
                code: `
<CodeBlock 
    content=[
        {
            code: "console.log(\"Styled CodeBlock\");",
            language: "javascript",
            fileName: "styledExample.js"
        }
    ]
    className="rounded-lg border p-2"
    theme="dark"
    fontSize="14px"
/>
                `,
                fileName: "example-props.tsx"
            }]} />
            <p>{language ? "Kode di atas menampilkan blok kode dengan class tambahan, tema dark, dan ukuran font yang lebih kecil." : "The above code displays a code block with additional styling, a dark theme, and a smaller font size."}</p>
        </div>
    );
};

export default Page;
