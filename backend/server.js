// const express = require('express')
// const cors = require('cors')
// const ConnectDb = require('./src/config/db.js')
// require('dotenv').config()

import express from "express";
import cors from "cors";
import { ConnectDb } from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json());

app.get("/", (req, res)=> {
    res.json({
        message: "Travel mate AI home page"
    })
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

await ConnectDb()
