import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    company: { type: String },
    status: {
        type: String,
        enum: ["New", "Contacted", "In Progress", "Closed"],
        default: "New"
    },
    // picture: { type: String, default: "https://res.cloudinary.com/dudamnl40/image/upload/v1766593714/default-person_z8ejrv.jpg" },
    // picture_id: {
    //     type: String, // Cloudinary public_id for deletion/overwrite
    //     default: null,
    // },
    assignedTo: [{ type: String, required: true }],

}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;