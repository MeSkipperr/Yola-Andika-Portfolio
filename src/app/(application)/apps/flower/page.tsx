"use client"

import { useState } from "react";
import { createToken } from "@/utils/api/jwt";
import { isValidEmail } from "@/utils/validator";
import { useRouter } from "next/navigation";

const FlowerValentine = () => {
    const router = useRouter();
    const adminToken = process.env.NEXT_PUBLIC_ADMIN_SECRET; // Gunakan NEXT_PUBLIC_ untuk akses di client-side
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        // Validasi email
        if (!isValidEmail(email)) {
            setError("Invalid email format");
            return;
        }

        if(token !== adminToken){
            setError("Invalid Token")
            return
        }

        try {
            const payload = {
                email
            }
            // Validasi token menggunakan fungsi verifyToken
            const response = await createToken(payload);
            console.log(response)
            
            if (!response) {
                setError("Failed to verify token. Please try again.");
                return;
            }
    
            setSuccess("Token is valid and matches the admin secret!");
            const tokenEncrypt = response.data.token;

            router.push(`/apps/flower/${tokenEncrypt}`)
        } catch (error) {
            console.error("Error process token",error)
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-dvh bg-lavenderPink flex flex-col justify-center items-center gap-2">
            <h1 className="text-4xl font-rubik-bubbles text-persianPink">Ask Owner to get token</h1>
            <input
                type="text"
                placeholder="Token..."
                className="py-4 px-6 border-none outline-none"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email..."
                className="py-4 px-6 border-none outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="py-2 px-4 bg-persianPink text-lavenderPink font-rubik-bubbles rounded-md"
                onClick={handleSubmit}
            >
                {isLoading?"Loading..":"Submit"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
};

export default FlowerValentine;