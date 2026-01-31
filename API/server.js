import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRoutes  from "./Routes/user.js";
import core from "cors";
import productRoutes from "./Routes/product.js";
import cartRoutes from "./Routes/cart.js"
import addressRoutes from "./Routes/address.js"
import paymentRoutes from "./Routes/payment.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(core(
 {   origin:true,
    methods: ["GET,POST,PUT,DELETE"],
    credentials: true
  }
));
app.use(bodyParser.json());

//home testing route
app.get("/",(req,res)=>
    res.json({message:"This is home page"})
)

//user router
app.use('/api/user',userRoutes);

//product router
app.use('/api/product',productRoutes);

//cart router
app.use('/api/cart',cartRoutes);

//address router
app.use('/api/address',addressRoutes);

//payment router
app.use('/api/payment',paymentRoutes);





// const PORT = 5000;
// mongoose.connect("mongodb://localhost:27017/Ecoomrce", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("Connected to DB")).catch((error) => console.log(error));

// app.listen( PORT,() => console.log(`Server running on port ${PORT}`));


// Access environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to DB"))
.catch((error) => console.error("DB connection error:", error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
