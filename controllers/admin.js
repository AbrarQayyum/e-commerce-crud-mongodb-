import { response } from "express";
import Admin from "../models/admin-model.js";

// Post Admin-data
export const postAdminData = async (req, res) => {
  try {
    const { name, userName, email, password , role} = req.body;
    console.log(name, email, password, userName , role); 
    const isEmailExisted = await Admin.findOne({ email: email });
    if (isEmailExisted) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    const adminData = new Admin({
      name,
      userName,
      email,
      password,
      role
    })

    await adminData.save();
    return res.status(200).json({ message: "data saved succesfully", success: true , adminData});


  }
  catch(error){
    res.status(500).json(error.message);
  }
}

// Get Admin data

export const getAdminsData = async (req, res) => {
  try {
    const getAdmins = await Admin.find()
    return res.status(200).json({ success : true , getAdmins});   
  }
  catch(error){
    return res.status(500).json(error.message);
  }
}

// get Admin by ID

export const getAdminById = async (req , res) => {
  try{
    const getAdminId = req.params.id;
    const adminData = await Admin.findById(getAdminId);
    if (!adminData) {
      return res.status(404).json({ message: "Admin not found" });

    }
    return res.status(200).json({ success: true, adminData , message :"got data"});   
  }
  catch(error){
          res.status(500).json(error.message);
  }
}

// delete Admin by ID
export const deleteAdminById = async (req , res) => {
  try{
    const deleteAdminById = req.params.id;
    const adminData = await Admin.findByIdAndDelete(deleteAdminById);
    if (!adminData) {
      return res.status(404).json({ message: "not found" });

    }
    return res.status(200).json({ success: true, adminData , message :"Admin deleted"});   
  }
  catch(error){
          res.status(500).json(error.message);
  }
}