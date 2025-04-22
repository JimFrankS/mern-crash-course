import mongoose from 'mongoose';
import Product from '../models/product.model.js'; 

export const getProducts =  async (req, res) => { // function for displaying all products
    try {
        const products = await Product.find({}); //empty object returns all products in the database
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Error in fetching products", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const createProducts = async (req, res) => {  // function for creating a new product
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image) {

        return res.status(400).json({success:false, message: "Pleasse provide all fields!"});
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in Creating Product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const updateProducts = async (req, res) =>{ // function for updating a product.
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid product"});
    }

    try {
       const updatedProduct = await Product.findByIdAndUpdate(id , product, {new: true});
        res.status(200).json({success: true, data: updatedProduct, message: "Product updated successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteProducts = async (req, res) =>{ // function for deleting a product
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid product"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.log("Error in deleting product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};