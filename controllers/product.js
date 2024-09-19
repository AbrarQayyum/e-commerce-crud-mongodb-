
import { response } from "express";
import products from "../models/product-model.js";


// POst Product-data
export const postProductData = async (req , res ) => {
    try{
        const {name , quantity , price, description,user  } = req.body;
        console.log(name , quantity, price, description,user); 
        const isnameExisted = await products.findOne({ name: name });
        if(isnameExisted) {
            return res.status(400).json({ message: "already exists" });
        }
        
        const productData = products({
            name,
            quantity,
            price,
            description,
            user
        })

        await productData.save();
        return res.status(200).json({ message: "data saved succesfully", success: true , productData});


    }
    catch(error){
        res.status(500).json(error.message);
    }
}

// Get products data

export const getProductsData = async (req, res) => {
    try {
        const getProducts = await products.find()
        return res.status(200).json({ success : true , getProducts});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

// get product_ID

export const getProductById = async (req , res) => {
    try{
        const getProductId = req.params.id;
        const productData = await products.findById(getProductId);
        if (!productData) {
            return res.status(404).json({ message: "product not found" });

        }
        return res.status(200).json({ success: true, productData , message :"got data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}

// get product buyer
export const getProductByuser = async (req , res) => {
    try{
        const productData = await products.find().populate("user");
        if (!productData) {
            return res.status(404).json({ message: "product not found" });

        }
        return res.status(200).json({ success: true, productData , message :"got data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}

// delete product by ID
export const deleteProductById = async (req , res) => {
    try{
        const deleteProductById = req.params.id;
        const productData = await products.findByIdAndDelete(deleteProductById);
        if (!productData) {
            return res.status(404).json({ message: "not found" });

        }
        return res.status(200).json({ success: true, productData , message :"Product deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}