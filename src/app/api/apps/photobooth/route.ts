import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const userEmail = formData.get("email") as string | null; // Ambil email jika ada

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // ✅ Ubah file menjadi Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 🔽 Konfigurasi Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 🔽 Kirim Email dengan lampiran
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail || process.env.EMAIL_USER, // Gunakan email user jika ada, jika tidak default
            subject: "User Photobooth Image",
            text: "Here is your photobooth image!",
            attachments: [
                {
                    filename: "photobooth.png",
                    content: buffer,
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
