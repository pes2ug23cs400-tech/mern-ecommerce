import { Product } from "../Models/Product.js";
//add product
export const addProduct = async (req, res) => {
    const { title, description, price, category, qty, imgSrc } = req.body;
    try {
        const product = await Product.create({
            title,
            description,
            price,
            category,
            qty,
            imgSrc,
        });
        res.status(201).json({ message: "Product added successfully", success: true, product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Products fetched successfully", success: true, products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//find product by id
export const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product)
            return res.status(400).json({ message: "Product not found", success: false });
        
        res.status(200).json({ message: "Product fetched successfully", success: true, product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//update product by id 
export const updateProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product)
            return res.status(400).json({ message: "Product not found", success: false });
        res.status(200).json({ message: "Product updated successfully", success: true, product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//delete product by id 
export const deleteProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product)
            return res.status(400).json({ message: "Product not found", success: false });
        res.status(200).json({ message: "Product deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}