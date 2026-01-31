import e from "cors";
import mongoose from "mongoose";    
const paymentSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    payStatus: {
        type: String,
        default: "pending"
    },
},{strict: false})

export const Payment = mongoose.model("Payment", paymentSchema);