"use client"
import CodeBlock from "@/components/code-block";
import { useLanguage } from "@/context/Language";

const codeSyntax = `
type StorageKey = string;

/**
 * Save data to localStorage.
 * @param key - The key under which the value will be stored.
 * @param value - The value to store, can be any serializable object.
 * @returns void
 * 
 * @example
 * setLocalStorage("user", { id: 1, name: "Kadek" });
 */
export const setLocalStorage = <T>(key: StorageKey, value: T): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieve data from localStorage.
 * @param key - The key of the stored value.
 * @returns The stored value or null if not found.
 * 
 * @example
 * const user = getLocalStorage<{ id: number; name: string }>("user");
 * console.log(user);
 */
export function getLocalStorage<T>(key: string): T | null {
    if (typeof window === "undefined") {
        return null;
    }
    
    const item = localStorage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item);
        } catch {
            return item as T;
        }
    }
    return null;
}

/**
 * Remove a specific key from localStorage.
 * @param key - The key to remove.
 * @returns void
 * 
 * @example
 * removeLocalStorage("user");
 */
export const removeLocalStorage = (key: StorageKey): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
};

/**
 * Clear all data from localStorage.
 * @returns void
 * 
 * @example
 * clearLocalStorage();
 */
export const clearLocalStorage = (): void => {
    if (typeof window === "undefined") return;
    localStorage.clear();
};
`;

const Page = () => {
    const { language } = useLanguage();
    return ( 
        <div className="w-full px-4 py-6 space-y-4 dark:text-white">
            <h1 className="text-4xl">Local Storage Utilities</h1>
            <code>utils/localStorage.ts</code>
            <p className="text-base">
                {language
                ?"File ini berisi fungsi-fungsi utilitas untuk mengelola penyimpanan data di localStorage pada browser. Dengan fungsi ini, Anda dapat menyimpan, mengambil, menghapus, dan membersihkan data di localStorage dengan mudah."
                :"This file contains utility functions for managing data storage in the browser’s localStorage. These functions allow you to store, retrieve, delete, and clear data easily."
                }
            </p>
            <CodeBlock content={
                [
                    {
                        code:codeSyntax,
                        language:"typescript"
                    }
                ]
            }/>
            {/* Storing Data */}
            <h2 className="text-3xl">{language ? "Implementasi" : "Implementation"}</h2>
            <h3 className="text-xl">{language ? "Menyimpan data ke localStorage" : "Storing data in localStorage"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
setLocalStorage("user", { id: 1, name: "Jhon" });
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Fungsi" : "The"} <code>setLocalStorage</code> {language ? "menyimpan data dalam" : "function stores data in"} <code>localStorage</code>.</p>
            <ul className="ml-8 list-disc">
                <li><code>key</code>: {language ? "Nama kunci penyimpanan." : "The storage key name."}</li>
                <li><code>value</code>: {language ? "Nilai yang ingin disimpan (objek dapat diserialisasi)." : "The value to store (any serializable object)."}</li>
            </ul>

            {/* Retrieving Data */}
            <h3 className="text-xl">{language ? "Mengambil data dari localStorage" : "Retrieving data from localStorage"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
const user = getLocalStorage<{ id: number; name: string }>("user");
console.log(user);
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Fungsi" : "The"} <code>getLocalStorage</code> {language ? "mengambil data yang tersimpan di" : "retrieves stored data from"} <code>localStorage</code>.</p>
            <ul className="ml-8 list-disc">
                <li><code>key</code>: {language ? "Nama kunci penyimpanan." : "The storage key name."}</li>
                <li>{language ? "Mengembalikan nilai yang tersimpan atau null jika tidak ditemukan." : "Returns the stored value or null if not found."}</li>
            </ul>
            
            {/* Removing Data */}
            <h3 className="text-xl">{language ? "Menghapus data dari localStorage" : "Removing data from localStorage"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
removeLocalStorage("user");
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Fungsi" : "The"} <code>removeLocalStorage</code> {language ? "menghapus item yang tersimpan berdasarkan kunci yang diberikan." : "removes the stored item based on the given key."}</p>
            <ul className="ml-8 list-disc">
                <li><code>key</code>: {language ? "Nama kunci yang akan dihapus." : "The key name to remove."}</li>
            </ul>
            
            {/* Clearing Data */}
            <h3 className="text-xl">{language ? "Menghapus semua data dari localStorage" : "Clearing all data from localStorage"}</h3>
            <CodeBlock content={
                [
                    {
                        code:`
clearLocalStorage();
                        `,
                        language:"typescript"
                    }
                ]
            }/>
            <p>{language ? "Fungsi" : "The"} <code>clearLocalStorage</code> {language ? "menghapus semua data yang tersimpan di" : "clears all stored data in"} <code>localStorage</code>.</p>
        </div>
    );
};

export default Page;
