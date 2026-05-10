import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        projectType: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["unread", "read"],
            default: "unread",
        },
    },
    { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
