import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/app/models/contact";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name, email, projectType, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        // 1. Save to Database (so you can view it in the Admin Dashboard later)
        await Contact.create({
            name,
            email,
            projectType,
            message,
        });

        // 2. Send Email Notification
        // You'll need to configure these in your .env.local file
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, // App Password for Gmail
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER, // The email you want to receive notifications at (e.g., your Cloudflare routed email)
            replyTo: email, // This allows you to hit "Reply" and email the user directly!
            subject: `New Portfolio Message from ${name} - ${projectType}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #000;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Project Type:</strong> ${projectType}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 });
    }
}
