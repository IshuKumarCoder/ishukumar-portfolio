import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/app/models/contact";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // In Next.js 15+, params is a Promise and must be awaited
    const { id } = await params;
    
    const body = await request.json();
    const { status } = body;

    if (!status || !["unread", "read"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, contact: updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
