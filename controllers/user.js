
import user from "../models/user-model.js"
import { response } from "express";

export const postUserData = async (req , res ) => {
    try{
        const {name , userName , password, email  } = req.body;
        console.log(name , email, password, userName); 
        const isEmailExisted = await user.findOne({ email: email });
        if(isEmailExisted) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        const userData = user({
            name,
            userName,
            email,
            password
        })

        await userData.save();
        return res.status(200).json({ message: "data saved succesfully", success: true , userData});



    }
    catch(error){
        res.status(500).json(error.message);
    }
}


// Get User Data

export const getUsersData = async (req, res) => {
    try {
        const getUsers = await user.find()
        return res.status(200).json({ success : true , getUsers});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}


// Get USer BY ID

export const getUserById = async (req , res) => {
    try{
        const getUserId = req.params.id;
        const userData = await user.findById(getUserId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });

        }
        return res.status(200).json({ success: true, userData , message :"got user data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


// Delete user by ID
export const deleteUserById = async (req , res) => {
    try{
        const deleteUserById = req.params.id;
        const userData = await user.findByIdAndDelete(deleteUserById);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });

        }
        return res.status(200).json({ success: true, userData , message :"user deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}