import express from "express"
import {createTrip, getMyTrips, getTripById, generateTripAIForUser} from "../controllers/TripController.js";
import protect from "../middleware/authMiddleware.js"



const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getMyTrips);
router.post("/:id/generate-ai", protect, generateTripAIForUser);
router.get("/:id", protect, getTripById);

export default router;