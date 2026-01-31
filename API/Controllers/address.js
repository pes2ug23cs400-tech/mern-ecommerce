// import { Address } from "../Models/Address.js";

// export const addAddress =async(req,res)=>{
//     const {userId,fullName,address,phoneNumber,city,state,country,pincode}=req.body;
//     try {
//         let address=await Address.findOne({userId})
//         if(address)
//             return res.status(400).json({message:"Address already exists",success:false});
//         address=await Address.create({userId,fullName,address,phoneNumber,city,state,country,pincode});
//         res.status(201).json({message:"Address added successfully",success:true,address});
//     } catch (error) {
//         res.status(500).json({error:error.message});
//     }
// }


import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
   let {fullName,address,phoneNumber,city,state,country,pincode}=req.body;  
   
   let userId=req.user;
    let userAddress=await Address.create({
        userId,
        fullName,
        address,
        phoneNumber,
        city,
        state,
        country,
        pincode
    })
       res.status(200).json({ message: "Address added successfully", success: true ,userAddress});
    };

    export const getAddress = async (req, res) => {
        let address=await Address.find({userId:req.user}).sort({createdAt:-1});
        res.status(200).json({ message: "Address fetched successfully", success: true ,userAddress:address[0]});   
    }

   

// import { Address } from "../Models/Address.js";

// export const addAddress = async (req, res) => {
//     const {
//         userId,
//         fullName,
//         address: addressText,
//         phoneNumber,
//         city,
//         state,
//         country,
//         pincode
//     } = req.body;

//     try {
//         const existingAddress = await Address.findOne({ userId });
//         if (existingAddress) {
//             return res.status(400).json({
//                 message: "Address already exists",
//                 success: false
//             });
//         }

//         const newAddress = await Address.create({
//             userId,
//             fullName,
//             address: addressText, // use the extracted value
//             phoneNumber,
//             city,
//             state,
//             country,
//             pincode
//         });

//         res.status(201).json({
//             message: "Address added successfully",
//             success: true,
//             address: newAddress
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
