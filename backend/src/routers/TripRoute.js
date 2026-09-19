import express from "express"
import createTrip from "../controllers/TripController.js";
import protect from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/", protect, createTrip);

export default router;