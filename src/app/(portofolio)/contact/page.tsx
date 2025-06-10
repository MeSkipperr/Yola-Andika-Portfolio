"use client"

import { useLanguage } from "@/context/Language";
import { useState } from "react";
import axios from 'axios';
import { contactConfig } from "@/config/contact";

const Contact = () => {
    const {language}= useLanguage();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userService, setUserService] = useState<string>("");
    const [userMessage, setUserMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailRegex.test(userEmail)||!userName.trim()||!userService.trim()||!userMessage.trim()) return
        setIsLoading(true)

        
        const content = `
Halo, saya ${userName},

Saya ingin menyampaikan pesan berikut:
"${userMessage}"

Layanan yang saya butuhkan: ${userService}

Terima kasih,
${userName}
        `;
        try {
            const response = await axios.get('/api/email', {
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_API_KEY,
                },
                params: {
                    userEmail,
                    subject:userService,
                    method:"text",
                    content,
                },
            });
            console.log(response)
            if(response.status === 200){
                setUserName("");
                setUserEmail("");
                setUserService("");
                setUserMessage("")
            }
            return ;
        } catch (error:unknown) {
            console.error("Unexpected error checking user:", error);
            return ;
        }finally{
            setIsLoading(false);
        }
    };

    return ( 
        <div className="pt-24 w-full dark:bg-darkBg flex justify-center items-center flex-col p-4 xl:px-80" >

        {/* About section */}
        <div className="w-full my-16 gap-8 flex flex-col">
            {/* <img src={aboutPic} alt="about" className='w-24 sm:w-40' /> */}
            <h2 className="dark:text-white text-black text-4xl sm:text-7xl">{language ? 'Mari kita mulai proyek bersama' : "Let's start a project together"}</h2>
        </div>

        {/* Contact form */}
        <div className="flex justify-start w-full flex-col">
            <form  action='/contact' onSubmit={sendEmail}>
                {/* Name input */}
                <hr className='border-t-1 sm:border-t-2 border-black dark:border-white my-4' />
                <label htmlFor="user_name" className='dark:text-white sm:text-2xl'>{language ? 'Nama' : "Name"}<span className='px-1 text-red-600'>*</span></label>
                <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    required
                    placeholder="I Kadek Yola Andika"
                    className="inputContactForm dark:text-white p-2 w-full h-10 bg-transparent sm:h-20 sm:placeholder:text-2xl sm:text-2xl"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                />

                {/* Email input */}
                <hr className='border-t-1 sm:border-t-2 border-black dark:border-white my-4' />
                <label htmlFor='user_email' className='dark:text-white sm:text-2xl'>Email<span className='px-1 text-red-600'>*</span></label>
                <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    required
                    placeholder="ikadek@yola.com"
                    className="inputContactForm dark:text-white p-2 w-full h-10 bg-transparent sm:h-20 sm:placeholder:text-2xl sm:text-2xl"
                    value={userEmail}
                    onChange={(e)=>setUserEmail(e.target.value)}
                />

                {/* Services input */}
                <hr className='border-t-1 sm:border-t-2 border-black dark:border-white my-4' />
                <label htmlFor='user_service' className='dark:text-white sm:text-2xl'>{language ? 'Apa layanan yang sedang anda cari?' : "What services are you looking for?"} <span className='px-1 text-red-600'>*</span></label>
                <input
                    type="text"
                    name="user_service"
                    id="user_service"
                    required
                    placeholder="Web Development, Network Topology..."
                    className="inputContactForm dark:text-white p-2 w-full h-10 bg-transparent sm:h-20 sm:placeholder:text-2xl sm:text-2xl"
                    value={userService}
                    onChange={(e)=>setUserService(e.target.value)}
                />

                {/* Message input */}
                <hr className='border-t-1 sm:border-t-2 border-black dark:border-white my-4' />
                <label htmlFor='user_message' className='dark:text-white sm:text-2xl'>{language ? 'Pesan' : "Message"}<span className='px-1 text-red-600'>*</span></label>
                <input
                    type="text"
                    name="user_message"
                    id="user_message"
                    required
                    placeholder={language ? 'Halo Yola, bisakah bantu saya dengan...' : "Hello Yola, can you help me with..."}
                    className="inputContactForm dark:text-white p-2 w-full h-10 bg-transparent sm:h-20 sm:placeholder:text-2xl sm:text-2xl"
                    value={userMessage}
                    onChange={(e)=>setUserMessage(e.target.value)}
                />

                {/* Submit button */}
                <hr className='border-t-1 sm:border-t-2 border-black dark:border-white my-4' />
                <button 
                    type="submit" 
                    className="submitContact btnHero px-7 rounded-md py-2 sm:px-10 sm:py-4 text-lg sm:text-2xl bg-third text-white"
                    disabled={isLoading}
                >
                    {isLoading 
                        ? (language ? 'Memuat...' : 'Loading...') 
                        : (language ? 'Kirimkan!' : 'Send It!')}
                </button>
            </form>
        </div>

        {/* Social links */}
        <div className="my-8 w-full">
            <p className='text-[#A2A9B4] sm:text-3xl'>{language ? 'Sosial' : "Social"}</p>
            <div className="flex gap-4">
                <a className='dark:text-white hover:text-third dark:hover:text-third hover:underline sm:text-2xl' target='blank' href={contactConfig.instagram.url}>Instagram</a>
                <a className='dark:text-white hover:text-third dark:hover:text-third hover:underline sm:text-2xl' target='blank' href={`mailto:${contactConfig.email}`}>Email</a>
                <a className='dark:text-white hover:text-third dark:hover:text-third hover:underline sm:text-2xl' target='blank' href={contactConfig.github.url}>GitHub</a>
            </div>
        </div>
    </div>
    );
}

export default Contact;