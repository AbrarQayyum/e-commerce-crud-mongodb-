import express from 'express';
import { postAdminData, getAdminsData, getAdminById, deleteAdminById } from '../controllers/admin.js';

const AdminRoute = express.Router();

AdminRoute.post("/createadmin", postAdminData);
AdminRoute.get("/getadmins", getAdminsData);
AdminRoute.get("/getadmin/:id", getAdminById);
AdminRoute.delete("/deleteadmin/:id", deleteAdminById);

export default AdminRoute;