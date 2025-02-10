import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { isValidEmail } from '@/utils/validator';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const userEmail: string = url.searchParams.get('userEmail') ?? "";
    const subject: string = url.searchParams.get('subject') ?? "";
    const method: string = url.searchParams.get('method') ?? "";
    const content: string = url.searchParams.get('content') ?? "";

    const sendMethodValue = ["html", "text"];

    if (!userEmail || !isValidEmail(userEmail)) {
        return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    if (!subject.trim()) {
        return NextResponse.json({ message: 'Subject cannot be empty' }, { status: 400 });
    }

    if (!content.trim()) {
        return NextResponse.json({ message: 'Content cannot be empty' }, { status: 400 });
    }

    if (!sendMethodValue.includes(method)) {
        return NextResponse.json({ message: 'Invalid method. Must be "html" or "text"' }, { status: 400 });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: subject,
            html: method === "html" ? content : undefined,
            text: method === "text" ? content : undefined
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Error sending OTP" }, { status: 500 });
    }
}
