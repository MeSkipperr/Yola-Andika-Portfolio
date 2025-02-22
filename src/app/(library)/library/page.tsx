"use client"
import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";
import Link from "next/link";

const LibraryPage = () => {
    const { language } = useLanguage();

    return ( 
        <div className="gap-4 flex flex-col">
            <h1 className="text-4xl">Library</h1>
            <p className="text-base">
                {language
                ? "Halaman ini adalah kumpulan kode yang dapat digunakan untuk membantu proses pengembangan. Termasuk di dalamnya berbagai komponen, fungsi, pustaka, konteks, dan hook yang dapat digunakan secara langsung dalam proyek Anda."
                : "This page is a collection of code that can be used to assist in the development process. It includes various components, functions, libraries, contexts, and hooks that can be directly used in your project."}
            </p>
            
            <h1 className="text-4xl">Instalasi</h1>
            <p className="text-base">
                {language
                ? "Untuk menggunakan pustaka ini, Anda dapat menginstalnya dengan perintah berikut:"
                : "To use this library, you can install it using the following command:"}
            </p>
            <CodeBlock content={
                [
                    {
                        code:"npm install @yola-andika",
                        language:"bash"
                    }
                ]
            }/>
            
            <h1 className="text-4xl">Components</h1>
            <p className="text-base">
                {language
                ? "Komponen yang dapat digunakan dalam proyek Anda."
                : "Components that can be used in your project."}
            </p>
            <Link href="/library/component">{"Home > Library > Components"}</Link>
            <CodeBlock content={
                [
                    {
                        code:"import {} from '@yola-andika/components'",
                        language:"javascript"
                    }
                ]
            }/>
            
            <h1 className="text-4xl">Functions</h1>
            <p className="text-base">
                {language
                ? "Fungsi yang siap digunakan untuk berbagai kebutuhan pengembangan."
                : "Pre-built functions ready to be used for various development needs."}
            </p>
            <Link href="/library/function">{"Home > Library > Functions"}</Link>
            <CodeBlock content={
                [
                    {
                        code:"import {} from '@yola-andika/functions'",
                        language:"javascript"
                    }
                ]
            }/>
            
            <h1 className="text-4xl">Libraries</h1>
            <p className="text-base">
                {language
                ? "Pustaka yang menyediakan berbagai utilitas dan alat bantu."
                : "Libraries that provide various utilities and tools."}
            </p>
            <Link href="/library/libs">{"Home > Library > Libraries"}</Link>
            <CodeBlock content={
                [
                    {
                        code:"import {} from '@yola-andika/libs'",
                        language:"javascript"
                    }
                ]
            }/>
            <h1 className="text-4xl">Context</h1>
            <p className="text-base">
                {language
                ? "Konteks yang dapat digunakan untuk manajemen state global."
                : "Context that can be used for global state management."}
            </p>
            <Link href="/library/context">{"Home > Library > Context"}</Link>
            <CodeBlock content={
                [
                    {
                        code:"import {} from '@yola-andika/context'",
                        language:"javascript"
                    }
                ]
            }/>
            <h1 className="text-4xl">Hooks</h1>
            <p className="text-base">
                {language
                ? "Hook kustom yang dapat digunakan untuk mengelola logika dalam aplikasi React."
                : "Custom hooks that can be used to manage logic in React applications."}
            </p>
            <Link href="/library/hooks">{"Home > Library > Hooks"}</Link>
            <CodeBlock content={
                [
                    {
                        code:"import {} from '@yola-andika/hooks'",
                        language:"javascript"
                    }
                ]
            }/>
        </div>
    );
}

export default LibraryPage;
