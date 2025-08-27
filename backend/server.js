import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import auth from "./routes/auth.js"
import task from "./routes/taskRoute.js"

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());


app.use("/api/auth" ,auth);
app.use("/api/task" , task);

connectDB();

const PORT = process.env.PORT ||4000


 

app.listen(process.env.PORT,() =>{
console.log(`server is running on ${process.env.PORT}`)
})