"use client"
import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";

const codeSyntax = `
export function isValidEmail(email: string): boolean {
    if (!email || email.trim() === "") {
        return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const isValidURL = (input: string) => {
    if (!input || input.trim() === "") return false;

    const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" +
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" +
        "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" +
        "(\\#[-a-zA-Z\\d_]*)?$",
        "i"
    );
    return urlPattern.test(input);
};

export const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\\+?[1-9]\\d{1,14}$/;
    return phoneRegex.test(phone);
};

export const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
};
`;

const Page = () => {
    const { language } = useLanguage();
    return (
        <div className="w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl">Validation Utilities</h1>
            <code>utils/validation.ts</code>
            <p className="text-base">
                {language
                    ? "File ini berisi fungsi-fungsi utilitas untuk validasi berbagai jenis data, termasuk email, URL, nomor telepon, dan nama pengguna."
                    : "This file contains utility functions for validating various types of data, including email, URL, phone number, and username."}
            </p>
            <CodeBlock content={
                [
                    {
                        code:codeSyntax,
                        language:"typescript"
                    }
                ]
            }/>
            
            <h2 className="text-3xl">{language ? "Implementasi" : "Implementation"}</h2>
            
            {/* Email Validation */}
            <h3 className="text-xl">{language ? "Validasi Email" : "Email Validation"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
console.log(isValidEmail("test@example.com"));
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Memeriksa apakah alamat email valid." : "Checks if an email address is valid."}</p>
            
            {/* URL Validation */}
            <h3 className="text-xl">{language ? "Validasi URL" : "URL Validation"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
console.log(isValidURL("https://example.com"));
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Memeriksa apakah URL valid." : "Checks if a URL is valid."}</p>
            
            {/* Phone Number Validation */}
            <h3 className="text-xl">{language ? "Validasi Nomor Telepon" : "Phone Number Validation"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
console.log(isValidPhoneNumber("+628123456789"));
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Memeriksa apakah nomor telepon valid." : "Checks if a phone number is valid."}</p>
            
            {/* Username Validation */}
            <h3 className="text-xl">{language ? "Validasi Nama Pengguna" : "Username Validation"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
console.log(isValidUsername("kadek_yola"));
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Memeriksa apakah nama pengguna valid." : "Checks if a username is valid."}</p>
        </div>
    );
};

export default Page;
