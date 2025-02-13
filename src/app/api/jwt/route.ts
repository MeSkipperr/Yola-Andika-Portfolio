import { generateToken, verifyToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const token = url.searchParams.get('token')?.trim() || "";

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const result = verifyToken(token);
        if (!result.valid) {
            return NextResponse.json({ error: result.error || "Invalid token" }, { status: 403 });
        }

        return NextResponse.json({ message: "Token verified successfully", decoded: result.decoded }, { status: 200 });
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { payload, expires = null } = await request.json();

        if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
            return NextResponse.json({ error: "Invalid payload data" }, { status: 400 });
        }

        const token = generateToken(payload, expires);

        return NextResponse.json({ message: "Token generated successfully", token }, { status: 200 });
    } catch (error) {
        console.error("Error generating token:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
