import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/app/models/admin";
import { connectDB } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";

export async function POST(req : Request) {
    try{
        await connectDB();
        const { email , password } = await req.json();
        const admin = await Admin.findOne({email});

        if(!admin){
            return NextResponse.json(
                {message : "Invalid credentials" },
                {status : 401 }
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if(!isMatch){
            return NextResponse.json(
                {message : "Invalid credentials" },
                {status : 401}
            );
        }

        const token = await generateToken({
            id : admin._id,
            email : admin.eamil,
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
        return NextResponse.json(
            {message: "Server Error"},
            {status: 500}
        );
    }
}
 