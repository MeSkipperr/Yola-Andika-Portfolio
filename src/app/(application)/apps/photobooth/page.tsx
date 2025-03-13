"use client"

import { useState } from "react";
import { LAYOUT } from "./config";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PhotoBooth = () => {
    const [isLayoutPage, setIsLayoutPage] = useState<boolean>(false);

    return ( 
        <div className="w-full lg:min-h-dvh py-40 px-2  flex flex-col lg:flex-row justify-center items-center" style={{ backgroundImage: "url('/background/blurry-white-pink.svg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        {isLayoutPage
        ? <LayoutSelect setIsLayoutPage={setIsLayoutPage} />
        :
        <div className="w-full lg:w-3/4 lg:h-3/4 bg-white rounded-sm p-4 text-persianPink">
            <h1 className="text-4xl lg:text-8xl fontKaftan font-semibold tracking-wide">Photobooth Digital</h1>
            <p className="text-xl lg:text-2xl">Capture Your Perfect Moments</p>
            <p className="lg:text-xl">By I Kadek Yola Andika</p>
            <hr className="border-persianPink mt-4 mb-14 "/>
            <div className="w-full lg:px-8 ">
                <p className="text-xl text-justify">{"Welcome to PhotoBooth Digital, a seamless and interactive way to create beautiful memories. Whether you're capturing a solo shot, a fun group picture, or a special occasion, this digital photobooth is designed to make every moment special."}</p>
                <section className="py-10  ">
                    <h2 className="text-3xl font-semibold ">How It Works</h2>
                    
                    <ol className="list-decimal w-full  text-lg pl-8">
                        <li>
                            <h3 className="text-xl font-semibold">Choose Your Layout</h3>
                            <p>Select the perfect layout to match your style, from classic portraits to fun collages.</p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold">Select Camera & Filters</h3>
                            <p>Pick your camera and enhance your photo with beautiful filters.</p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold">Press Start & Get Ready</h3>
                            <p>Hit the <strong>Start</strong> button, wait for the <strong>3-second countdown</strong>, and strike your best pose.</p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold">Customize Your Photo</h3>
                            <p>Adjust the border, add text, and reposition elements using drag-and-drop.</p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold">Download & Share</h3>
                            <p>Save your masterpiece and share it with friends and family.</p>
                        </li>
                    </ol>
                </section>
            </div>
            <button className="w-full flex justify-end text-xl underline" onClick={()=>setIsLayoutPage(true)}>Start Select Your Layout</button>
        </div>
    }
        </div>
    );
}

export default PhotoBooth;

const LayoutSelect = ({setIsLayoutPage}:{setIsLayoutPage:(value:boolean)=>void}) => {
    const pathname = usePathname();
    const [selectLayout, setSelectLayout] = useState<number>(0);

    return ( 
        <div className="w-full lg:w-3/4  bg-white rounded-sm p-4 text-persianPink">
            <h1 className="text-4xl lg:text-8xl fontKaftan font-semibold tracking-wide">Select Layout</h1>
            <hr className="border-persianPink mt-4 mb-14 "/>
            <ul className="w-full h-full grid grid-cols-3 lg:grid-cols-6 gap-2 ">
                {LAYOUT.map((layout,index) => (
                    <li 
                        className={`w-full p-2  rounded-sm flex j ${selectLayout === index && "bg-slate-200"} cursor-pointer`} 
                        key={"Layout:"+index}
                        onClick={()=>setSelectLayout(index )}
                        >
                        <div className="w-full  p-4 pb-10 bg-white rounded-m " style={{ backgroundColor: "#ffffff" }}>
                            {layout && (
                                <div className={` ${layout.layout.parent} gap-2 pb-8 mx-auto`}>
                                    {Array.from({ length: layout.content }, (_, index) => (
                                        <div
                                            key={`content-${index}`}
                                            className={`w-full aspect-[4/3] bg-lavenderPink ${index === 0 && layout.layout.child}`}
                                        >
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="w-full flex justify-between mt-8">
                <button className="w-full flex justify-start text-xl underline" onClick={()=>setIsLayoutPage(false)}>Back</button>
                <Link href={pathname+`/start?layout=${selectLayout+1}`}>
                    <button className="w-full flex justify-end text-xl underline ">Next</button>
                </Link>
            </div>
        </div>
    );
}
