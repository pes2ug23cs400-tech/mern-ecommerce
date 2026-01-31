import express from "express";
import { checkout,varify ,userOrder,allOrders} from "../Controllers/payment.js";
import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();

//checkout
router.post("/checkout",checkout)

//verify payment and save to db
router.post("/verify-payment",varify)

//order confirmation
router.get("/userorder",Authenticated,userOrder)

//All orders
router.get("/orders",allOrders)

export default router