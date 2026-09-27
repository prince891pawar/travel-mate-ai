import express from "express";
import cors from "cors";
import { ConnectDb } from "./src/config/db.js";
import dotenv from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./src/routers/AuthRoute.js";
import tripRoutes from "./src/routers/TripRoute.js"

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), ".env") });

const app = express()
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes)
app.use("/api/trips", tripRoutes )


app.get("/", (req, res)=> {
    res.json({
        message: "Travel mate AI home page"
    })
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

await ConnectDb()
