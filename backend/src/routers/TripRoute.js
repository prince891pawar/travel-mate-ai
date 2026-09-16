const express = require("express");


import {createTrip} from ("../controllers/TripController.js")
import protect from ("../middleware/authMiddleware")

const router = express.Router();

router.post("/", protect, createTrip);

module.exports = router;