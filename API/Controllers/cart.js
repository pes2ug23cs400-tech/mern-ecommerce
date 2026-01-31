import { Cart } from "../Models/Cart.js";

// export const addToCart =async(req,res)=>{
//     const {userId,productId,title,price,qty,imgSrc}=req.body;
//     try {
//         let cart=await Cart.findOne({userId,productId})
//         if(cart)
//             return res.status(400).json({message:"Product already exists in cart",success:false});
//         cart=await Cart.create({userId,productId,title,price,qty,imgSrc});
//         res.status(201).json({message:"Product added to cart successfully",success:true,cart});
//     } catch (error) {
//         res.status(500).json({error:error.message});
//     }
// }

// //add to cart
// export const addToCart = async (req, res) => {
//     const { productId, title, price, qty, imgSrc } = req.body;
//     const userId = req.user;

//     try {
//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             cart = new Cart({ userId, items: [] });
//         }

//         const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//         if (itemIndex > -1) {
//             // Update existing item
//             cart.items[itemIndex].qty += qty;
//             cart.items[itemIndex].price = price * cart.items[itemIndex].qty;
//         } else {
//             // Add new item
//             cart.items.push({ productId, title, price: price * qty, qty, imgSrc });
//         }

//         await cart.save();

//         res.status(itemIndex > -1 ? 200 : 201).json({
//             message: itemIndex > -1
//                 ? "Product quantity updated successfully"
//                 : "Product added to cart successfully",
//             success: true,
//             cart
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



export const addToCart = async (req, res) => {
    const { productId, title, price, qty, imgSrc } = req.body;
    const userId = req.user;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price = price * cart.items[itemIndex].qty;
        } else {
            cart.items.push({ productId, title, price: price * qty, qty, imgSrc });
        }

        await cart.save();

        res.status(itemIndex > -1 ? 200 : 201).json({
            message: itemIndex > -1
                ? "Product quantity updated successfully"
                : "Product added to cart successfully",
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//get user cart
export const userCart = async (req, res) => {
    const userId = req.user;
    try {
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart)
            return res.status(400).json({ message: "Cart not found", success: false });
        res.status(200).json({ message: "Cart fetched successfully", success: true, cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//remove product from cart
export const removeProductFromCart = async (req, res) => {
    const productId  = req.params.productId;
    const userId = req.user
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart)
            return res.status(400).json({ message: "Cart not found", success: false });
       cart.items = cart.items.filter(item => item.productId.toString() !== productId);
       await cart.save();
       res.status(200).json({ message: "Product removed from cart successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//clear cart--edit
export const clearCart = async (req, res) => {
    const userId = req.user;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart)
           cart = new Cart({items: [] });
        else{
            cart.items = [];
        }
        await cart.save();
        res.status(200).json({ message: "Cart cleared successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//decrease to cart
export const decreaseProductQty = async (req, res) => {
   const { productId,qty } = req.body;
    const userId = req.user;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart)
            res.status(400).json({ message: "Cart not found", success: false });
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
          const item = cart.items[itemIndex];

          if(item.qty>qty){
            const pricePerUnit = item.price / item.qty;
            item.qty -= qty;
            item.price = pricePerUnit * item.qty;
          }
          else{
            cart.items.splice(itemIndex, 1);
          }

        await cart.save();
        res.status(200).json({ message: "Product quantity decreased successfully", success: true });
        } else {
            res.status(400).json({ message: "Product not found in cart", success: false });    
        }
    } catch (error) {
        res.status(500).json({ error: error.message });         
    }    
};


// // decrease qty from Cart
// export const decreaseProductQty = async (req, res) => {
//   const { productId, qty} = req.body;

//   const userId = req.user;

//   let cart = await Cart.findOne({ userId });
 
//   if (!cart) {
//     cart = new Cart({ userId, items: [] });
//     // return res.json({messge:'Cart not find'})
//   }

//   const itemIndex = cart.items.findIndex(
//     (item) => item.productId.toString() === productId
//   );

//   if (itemIndex > -1) {
//     const item = cart.items[itemIndex]

//     if(item.qty > qty){
//         const pricePerUnit = item.price/item.qty

//         item.qty -= qty
//         item.price -= pricePerUnit*qty
//     }else{
//         cart.items.splice(itemIndex,1)
//     }

//   } else {
//     return res.json({messge:'invalid product Id'})
//   } 

//   await cart.save();
//   res.json({ message: "Items qty decreased", cart });
// };