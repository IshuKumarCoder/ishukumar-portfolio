import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/app/models/admin";
import { connectDB } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";

export async function POST(req : Request) {
    try{
        await connectDB();
        const { email , password } = await req.json();
        
        const trimmedEmail = email.trim();
        console.log("Login attempt for email:", trimmedEmail);
        
        const admin = await Admin.findOne({ email: trimmedEmail });

        if(!admin){
            console.log("Admin not found in DB.");
            return NextResponse.json(
                {message : "Invalid credentials" },
                {status : 401 }
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );
        
        console.log("Password match result:", isMatch);

        if(!isMatch){
            return NextResponse.json(
                {message : "Invalid credentials" },
                {status : 401}
            );
        }

        const token = await generateToken({
            id : admin._id,
            email : admin.email,
        });

        const response = NextResponse.json({
            success : true,
        });

        response.cookies.set("token", token, {
            httpOnly : true,
            secure: true,
            sameSite: "strict",
            path:"/",
        });

        return response;
    }catch (error){
        console.error("Login Error:", error);
        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        );
    }
}