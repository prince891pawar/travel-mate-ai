import express from "express"
import {createTrip, getMyTrips, getTripById} from "../controllers/TripController.js";
import protect from "../middleware/authMiddleware.js"



const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getMyTrips);
router.get("/:id", protect, getTripById);

export default router;