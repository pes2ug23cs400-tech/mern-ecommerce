import {User} from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user registration
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check for empty fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  // Check for existing user
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User already exists", success: false });

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });

    res.status(201).json({ message: "User created successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//user login
export const login =async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message:"User does not exist",success:false});
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword)
            return res.status(400).json({message:"Invalid credentials",success:false});

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY || "secret",{expiresIn:"365d"});
        res.status(200).json({message:`Welcome ${user.name}`,token,success:true,user});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//get all users
export const users =async(req,res)=>{
    try {
        const users=await User.find().sort({createdAt:-1});
        res.status(200).json({message:"Users fetched successfully",success:true,users});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


//get profile

export const profile=async(req,res)=>{
res.status(200).json({message:"Profile fetched successfully",success:true,user:req.user});
}