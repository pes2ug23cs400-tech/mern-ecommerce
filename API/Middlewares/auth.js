import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const Authenticated= async(req,res,next)=>{
    try {
        const token=req.header("Auth")
        if(!token)
            res.status(401).json({message:"Login first"});
        const decoded=jwt.verify(token,(process.env.JWT_SECRET_KEY) || "secret");
        const id=decoded.userId;

        let user=await User.findById(id);
        if(!user)
            res.status(401).json({message:"User not found"});

        req.user=user;
        next();
    } catch (error) {
        res.status(401).json({error:"Unauthorized"});
    }
}

// Middlewares/auth.js
