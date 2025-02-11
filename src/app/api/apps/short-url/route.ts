import { encodeUTF8 } from "@/utils/hex";
import { JsonStorage } from "@/utils/jsonStorage";
import { NextResponse } from "next/server";

interface ShortURl {
    id: number;
    url: string;
    hex: string;
    [key: string]: unknown;
}


export async function GET(request: Request) {
    const userStorage = new JsonStorage<ShortURl>("/apps/short-url.json");

    const url = new URL(request.url);
    const value: string = url.searchParams.get('value') ?? "";
    console.log(value)

    if (!value || value.trim() === "") {
        return NextResponse.json({ message: 'Invalid Value' }, { status: 404 });
    }
    try {
        const shortUrlData = userStorage.findItemByKey("hex", value);;

        if(!shortUrlData) return NextResponse.json({ message: 'Invalid Value' }, { status: 404 });

        return NextResponse.json({ message: 'Success get value short url ' ,shortUrlData}, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Error sending short url" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const userStorage = new JsonStorage<ShortURl>("/apps/short-url.json");

    const { url } = await request.json();

    if (!url ) {
        return NextResponse.json({ message: 'Invalid url' }, { status: 404 });
    }

    try {
        const shortUrlData = userStorage.findItemByKey("url", url);
        if(shortUrlData)return NextResponse.json({ message: 'Token successfully matched', urlData:shortUrlData }, { status: 200 });

        const dataLenght = userStorage.getLength();
        const hexUrl = encodeUTF8(`short${dataLenght+1}`)

        const newURL = userStorage.createItem({
            id:dataLenght+1,
            url,
            hex:hexUrl
        });

        return NextResponse.json({ message: 'Token successfully matched', urlData:newURL }, { status: 200 });
    } catch (error) {
        console.error("Error matching token: ", error);
        return NextResponse.json({ message: 'Token processing error' }, { status: 500 });
    }
}

