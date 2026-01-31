import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECREAT,
});


//checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//verify ,save to db
export const varify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "success",
  });
  res
    .status(200)
    .json({
      message: "Payment verified successfully",
      success: true,
      orderConfirm,
    });
};


//user specificOrder

// export const userOrder=async (req,res)=>{
//         let userId=req.user._id.toSting()
//         console.log("user id",userId)
//         let orders=await Payment.find({userId:userId}).sort({orderDate:-1})
//         res.status(200).json({message:"Order fetched successfully",success:true,orders})

// }

export const userOrder = async (req,res) =>{
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate :-1});
  res.status(200).json(orders)
}


// export const allOrders = async (req,res) =>{
//   let orders = await Payment.find().sort({ orderDate :-1});
//   res.status(200).json(orders)
// }

export const allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.status(200).json(orders)
}