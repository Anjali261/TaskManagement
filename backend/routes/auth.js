import express from "express";
import { loginUSer, registerUser } from "../controller/authController.js";

const router = express.Router();

router.post("/register" , registerUser);
router.post('/login' ,loginUSer );

export default router;;