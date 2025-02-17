"use client"
import { useDarkMode } from "@/context/DarkModeContext";
import { useLanguage } from "@/context/Language";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathName = usePathname();
    const { language, setLanguage } = useLanguage();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const [isOpen, setIsOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [screenHeight, setScreenHeight] = useState<number | null>(null);  // Initialize with null

    useEffect(() => {
        // Ensure the code runs only in the browser (client-side)
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                if (window.scrollY > (screenHeight || 0)) {  // Check if screenHeight is not null
                    setScrolling(true);
                } else {
                    setScrolling(false);
                }
            };

            const handleResize = () => {
                setScreenHeight(window.innerHeight);
            };

            setScreenHeight(window.innerHeight);  // Set initial height on mount
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [screenHeight]);

    const backgroundClasses = () => {
        if (isOpen) {
            return "bg-white dark:bg-darkBg";
        }
        if(pathName !== "/") return "bg-trans dark:bg-transDark" 
        return scrolling
            ? "bg-trans dark:bg-transDark"
            : "bg-[#ecececcc] dark:bg-[#101012cc]";
    };

    return ( 
        <div className={`w-full h-14 py-9 ${backgroundClasses()} flex justify-between items-center z-50 backdrop-blur-sm fixed `}>
            <h1 className=' px-4 md:text-2xl sm:px-8  text-second fontKaftan font-bold tracking-wider' >I KADEK YOLA ANDIKA</h1>
            <button className="flex items-center px-6  text-dark dark:text-white lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                <svg
                    className={`w-10 h-10 ${isOpen ? 'hidden' : 'block'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
                <svg
                    className={`w-10 h-10 ${isOpen ? 'block' : 'hidden'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <div className="content gap-8 px-8 hidden lg:flex items-center">
                <a className='text-lg cursor-pointer hover:text-second dark:hover:text-second dark:text-primary ' href={`/`}>{language ? 'BERANDA' : 'HOME'}</a>
                <a className='text-lg cursor-pointer hover:text-second dark:hover:text-second dark:text-primary ' href={`/#about`}>{language ? 'TENTANG ' : 'ABOUT'}</a>
                <a className='text-lg cursor-pointer hover:text-second dark:hover:text-second dark:text-primary ' href={`/#service`}>{language ? 'LAYANAN' : 'SERVICE'}</a>
                <a className='text-lg cursor-pointer hover:text-second dark:hover:text-second dark:text-primary ' href={`/apps`}>{language ? 'APP' : 'APPS'}</a>
                <a className='text-lg cursor-pointer hover:text-second dark:hover:text-second dark:text-primary ' href={`/connection`}>{language ? 'KONEKSI' : 'CONNECTION'}</a>

                <label className="language-label cursor-pointer text-lg  font-semibold dark:text-primary">
                    <input type="radio" name="bahasa" value="indonesia"  checked={language} className="hidden" onChange={()=>setLanguage(true)} />
                    <p className="indonesia ">ID</p>
                </label>
                <hr className="label-divider h-6 font-bold mx-3 border-t border-solid border-dark dark:border-primary dark:bg-white " />
                <label className="language-label cursor-pointer text-lg font-semibold dark:text-primary">
                    <input type="radio" name="bahasa" value="inggris" checked={!language} className="hidden" onChange={()=>setLanguage(false)} />
                    <p className="inggris">EN</p>
                </label>
                <a href={'/contact'}>
                    <button className=" cursor-pointer w-28 h-9  border-2 border-solid border-third rounded font-bold text-base bg-transparent text-third hover:bg-third hover:text-white">{language ? 'KONTAK' : 'CONTACT'}</button>
                </a>
                <Image
                    src={isDarkMode?"/icons/light.svg":"/icons/dark.svg"}
                    alt={isDarkMode?"Dark Icon" : "Light Icon"}
                    width={100}
                    height={100}
                    className="w-8 ml-4 cursor-pointer"
                    title={isDarkMode?"Dark Icon":"Light Icon"}
                    onClick={toggleDarkMode}
                />
            </div>
            <div className={`h-screen fixed inset-0 lg:hidden z-50 flex justify-end transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={()=>setIsOpen(false)} style={{ zIndex: 9999 }} >
                <div className={`w-3/4  bg-white dark:bg-darkBg  backdrop-blur-sm  h-screen mt-16  `} onClick={(e) => e.stopPropagation()} >
                    <div className={` content 
                            w-full backdrop-filter backdrop-blur-5 flex items-center flex-col gap-4 text-center `}>
                        <a className='text-lg   cursor-pointer hover:text-second dark:text-primary dark:hover:text-second' href={'/'}>{language ? 'BERANDA' : 'HOME'}</a>
                        <a className='text-lg   cursor-pointer hover:text-second dark:text-primary dark:hover:text-second' href={`/#about`}>{language ? 'TENTANG ' : 'ABOUT'}</a>
                        <a className='text-lg   cursor-pointer hover:text-second dark:text-primary dark:hover:text-second' href={`/#service`}>{language ? 'LAYANAN' : 'SERVICE'}</a>
                        <a className='text-lg   cursor-pointer hover:text-second dark:text-primary dark:hover:text-second' href={`/connection`}>{language ? 'KONEKSI' : 'CONNECTION'}</a>

                        <div className="flex justify-center">
                            <label className="language-label cursor-pointer text-lg  font-semibold dark:text-primary">
                                <input type="radio" name="bahasa-m" value="indonesia" checked={language} className="hidden"  onChange={()=>setLanguage(true)}/>
                                <p className="indonesia ">ID</p>
                            </label>
                                <hr className="label-divider h-6 font-bold mx-3 border-t border-solid border-dark dark:border-primary dark:bg-white " />
                            <label className="language-label cursor-pointer text-lg font-semibold dark:text-primary">
                                <input type="radio" name="bahasa-m" value="inggris" checked={!language} className="hidden"   onChange={()=>setLanguage(false)} />
                                <p className="inggris">EN</p>
                            </label>
                        </div>
                        <a href={'/contact'}>
                        <button className=" cursor-pointer w-28 h-9 border-2 border-solid border-third rounded font-bold text-base bg-transparent text-third hover:bg-third hover:text-white">{language ? 'KONTAK' : 'CONTACT'}</button>
                        </a>
                        <Image
                            src={isDarkMode?"/icons/light.svg":"/icons/dark.svg"}
                            alt={isDarkMode?"Dark Icon" : "Light Icon"}
                            width={100}
                            height={100}
                            className="w-8 ml-4 cursor-pointer"
                            title={isDarkMode?"Dark Icon":"Light Icon"}
                            onClick={toggleDarkMode}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
