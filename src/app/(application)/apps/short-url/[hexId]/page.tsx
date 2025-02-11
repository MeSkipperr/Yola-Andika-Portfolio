"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!params.hexId) return;

        const fetchShortUrl = async () => {
            try {
                const response = await axios.get("/api/apps/short-url", {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Replace with actual token
                    },
                    params: { value: params.hexId }
                });
                console.log(response)
                // If the response is invalid or empty, show an error UI
                if (response.status !== 200 || !response.data || response.data.length === 0) {
                    setError(true);
                    return;
                }
                

                // Redirect to the target URL if found
                router.push(response.data.shortUrlData.url);
            } catch (error) {
                console.log("Error:", error);
                setError(true);
            }
        };

        fetchShortUrl();
    }, [params.hexId, router]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-red-500 text-lg font-semibold mb-4">
                    Oops! The URL was not found or an error occurred.
                </p>
                <button
                    onClick={() => router.push("/apps/short-url")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Go back to Short URL
                </button>
            </div>
        );
    }

}
