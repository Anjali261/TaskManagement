import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();
const app = express();
connectDB();

const PRT = process.env.PORT ||4000

 

app.listen(process.env.PORT,() =>{
console.log(`server is running on ${process.env.PORT}`)
})