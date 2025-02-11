import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const count: string = url.searchParams.get('noCount') ?? "";
    console.log(count);

    if (!count || count.trim() === "") {
        return NextResponse.json({ message: 'Invalid value provided' }, { status: 400 });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Valentine Confirmation",
            text: `
            I confirm my participation for Valentine's Day.  
            I have pressed the "No" button ${count} times.
            `
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
