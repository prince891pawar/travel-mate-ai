// const express = require('express')
// const cors = require('cors')
// const ConnectDb = require('./src/config/db.js')
// require('dotenv').config()

import express from "express";
import cors from "cors";
import { ConnectDb } from "./src/config/db.js";
import dotenv from "dotenv";
import authRoutes from "./src/routers/AuthRoute.js";

dotenv.config();

const app = express()
app.use(express.json()); // 👈 MUST be before routes
app.use("/api/auth", authRoutes)

app.use(cors())



app.get("/", (req, res)=> {
    res.json({
        message: "Travel mate AI home page"
    })
})



app.listen(3000, () => {
    console.log("server is running on port 3000")
})

await ConnectDb()
