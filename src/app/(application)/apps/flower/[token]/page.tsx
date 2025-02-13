"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import "./style.css";
import { IoPawSharp } from "react-icons/io5";
import axios from "axios";
import { verifyToken } from "@/utils/api/jwt";
import { useParams, useRouter } from "next/navigation";

interface DecodedToken {
    decoded: {
        email: string;
        // Tambahkan properti lain jika diperlukan
    };
    // Tambahkan properti lain jika ada
}

const AnimatedText = () => {
    const text = "I Have Something".split("");
    const [letters, setLetters] = useState<{ char: string; delay: number }[]>([]);

    useEffect(() => {
        const mappedLetters = text.map((char) => ({
            char,
            delay: Math.random() * 3, // Delay acak antara 0 - 3 detik
        }));
        setLetters(mappedLetters);
    }, []);

    return (
        <h1 className=" title text-6xl font-bold flex">
            {letters.map((item, index) => (
                <span
                    key={index}
                    style={{ animationDelay: `${item.delay}s`, marginRight: item.char === " " ? "20px" : "0" }}
                    className="animate-fadeIn text-persianPink font-rubik-bubbles"
                >
                    {item.char}
                </span>
            ))}
        </h1>
    );
};

const Apps = () => {
    const router = useRouter();
    const [noButtonStyle, setNoButtonStyle] = useState<{ top: string; left: string } | null>(null);
    const [yesButtonScale, setYesButtonScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const [firstClick, setFirstClick] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [sayYes, setSayYes] = useState<boolean>(false);
    const [decodedToken, setDecodedToken] = useState<DecodedToken>();

    const params = useParams();
    const token = params.token as string;

    useEffect(() => {
        const fetchTokenVerification = async () => {
            if (!token) {
                router.push("/apps/flower");
                return;
            }

            try {

                const result = await verifyToken(token);

                if (!result || result.status !== 200) {
                    router.push("/apps/flower");
                    return;
                }
                setDecodedToken(result.data);

            } catch (error) {
                console.log("Error verifying token:", error);
                router.push("/apps/flower");
            }
        }
        fetchTokenVerification();
    }, []);

    if (!decodedToken) {
        return <div>Verifying token...</div>;
    }

    console.log(decodedToken)

    const moveNoButton = () => {
        if (containerRef.current) {
            setCount(count + 1);
            const containerRect = containerRef.current.getBoundingClientRect();
            const buttonWidth = 64; // Sesuai dengan w-16 pada Tailwind
            const buttonHeight = 32; // Perkiraan tinggi tombol

            const randomX = Math.floor(Math.random() * (containerRect.width - buttonWidth));
            const randomY = Math.floor(Math.random() * (containerRect.height - buttonHeight));

            setNoButtonStyle({
                top: `${randomY}px`,
                left: `${randomX}px`,
            });
        }

        setYesButtonScale((prevScale) => Math.min(prevScale + 1, 100)); // Maksimum 10rem
    };

    const fetchData = async () => {
        const res = await axios.get("/api/apps/flower", {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Replace with actual token
            },
            params: { 
                noCount: count, 
                email:decodedToken.decoded.email 
            }
        });
        if (res.status === 200) return setSayYes(true);
    };

    if (!isOpen) {
        return (
            <div className="w-full h-dvh relative bg-lavenderPink flex justify-center flex-col items-center gap-8">
                <AnimatedText />
                <button
                    onClick={() => setIsOpen(true)}
                    className="py-4 px-6 btn font-rubik-bubbles bg-persianPink rounded-full text-lavenderPink text-2xl hover:text-persianPink hover:bg-lavenderPink hover:py-8 hover:px-10">
                    <IoPawSharp />
                    OPEN
                    <IoPawSharp />
                </button>
            </div>
        );
    }

    return (
        <>
            {sayYes ?
                <div className="absolute inset-0 bg-lavenderPink z-20 flex justify-center items-center flex-col">
                    <div className="w-full h-1/2 flex justify-center items-center flex-row">
                        <Image
                            src="/assets/gif/kitty-happy.gif"
                            alt="sun-flower-gif"
                            width={1000}
                            height={1000}
                            className="w-1/2 aspect-square"
                        />
                    </div>
                    <h1 className="font-rubik-bubbles text-persianPink text-6xl">THANK YOU</h1>
                </div>
                :
                <div className="w-full h-auto relative bg-lavenderPink flex justify-center items-center flex-col  ">
                    <iframe src="/html/flower/flower.html" className="w-full h-dvh"></iframe>
                    <div className="w-full lg:w-2/4 h-[150dvh] bg-lavenderPink flex justify-center items-center flex-col px-2">
                        <div className="w-full  flex justify-center items-center flex-row">
                            <Image
                                src="/assets/gif/sun-flower.gif"
                                alt="sun-flower-gif"
                                width={1000}
                                height={1000}
                                className="w-1/2 lg:w-1/4 aspect-square"
                            />
                            <Image
                                src="/assets/gif/cat-please.gif"
                                alt="sun-flower-gif"
                                width={1000}
                                height={1000}
                                className="w-1/2 lg:w-1/4 aspect-square"
                            />
                        </div>
                        <div className="w-full h-1/2 flex items-center flex-col text-persianPink relative overflow-hidden mb-10">
                            <h1 className="font-rubik-bubbles tracking-wider text-2xl lg:text-4xl">Will you be my Valentine?</h1>
                            <div className={`w-full h-full justify-center  flex gap-8 relative ${firstClick ? "flex-col items-center" : "items-start "}`}>
                                <button
                                    className="bg-green-400 text-white rounded-md font-bold tracking-wider px-4 py-2 z-10"
                                    style={{
                                        fontSize: `${yesButtonScale}rem`,
                                        maxWidth: "100vw",
                                        maxHeight: "100vh",
                                        transition: "font-size 0.3s ease-in-out"
                                    }}
                                    onClick={fetchData}
                                >
                                    YES
                                </button>
                                {firstClick ?
                                    <div ref={containerRef} className="w-full flex-1 flex relative overflow-hidden">
                                        <button
                                            className="bg-red-400 text-white w-16 py-2 rounded-md font-bold tracking-wider absolute"
                                            onClick={moveNoButton}
                                            style={noButtonStyle || { top: "0px", left: "0px" }}
                                        >
                                            NO
                                        </button>
                                    </div>
                                    :
                                    <button
                                        className="bg-red-400 text-white w-16 py-2 rounded-md font-bold tracking-wider "
                                        onClick={() => {
                                            setYesButtonScale((prevScale) => Math.min(prevScale + 1, 100)); // Maksimum 10rem
                                            setFirstClick(true)
                                        }}
                                        style={noButtonStyle || { top: "0px", left: "0px" }}
                                    >
                                        NO
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer
                transitionColor={false}
                lightColor="#ffdafc"
                darkColor="#ffdafc"
                textColor="#f991cc"
            />
        </>
    );
};

export default Apps;