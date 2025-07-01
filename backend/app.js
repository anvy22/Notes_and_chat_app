import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./src/config/database.js";

const app = express();
connectDB();

app.listen(3000,()=>{
    console.log("app is listening at port 3000");
})