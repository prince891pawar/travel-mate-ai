import Trip from "../models/Trip.js"
import mongoose from "mongoose"
import generateTripAI from "../services/aiServices.js"

const createTrip = async (req, res) => {
  try {
    const {
      destination,
      startingFrom,
      startingDate,
      endDate,
      budget,
      travelers,
      travelStyle,
      hotelPreference,
      notes,
    } = req.body;

    // Check required fields
    if (
      !destination ||
      !startingFrom ||
      !startingDate ||
      !endDate ||
      !budget ||
      !travelers ||
      !travelStyle ||
      !hotelPreference
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const parsedStartingDate = new Date(startingDate);
    const parsedEndDate = new Date(endDate);
    if (
      Number.isNaN(parsedStartingDate.getTime()) ||
      Number.isNaN(parsedEndDate.getTime()) ||
      parsedEndDate < parsedStartingDate
    ) {
      return res.status(400).json({ message: "Please provide valid trip dates" });
    }

    // Create trip
    const trip = await Trip.create({
      user: req.user,
      destination,
      startingFrom,
      startingDate,
      endDate,
      budget,
      travelers,
      travelStyle,
      hotelPreference,
      notes,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    console.error("Create Trip Error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: "Please check the trip details and try again" });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Trips fetched successfully",
      trips,
    });
  } catch (error) {
    console.error("Get Trips Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid trip ID" });
    }

    const trip = await Trip.findOne({
      _id: id,
      user: req.user,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json({
      message: "Trip fetched successfully",
      trip,
    });
  } catch (error) {
    console.error("Get Trip By ID Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const generateTripAIForUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid trip ID" });
  }

  let trip;
  try {
    trip = await Trip.findOne({ _id: id, user: req.user });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.aiStatus = "generating";
    await trip.save();

    const generatedPlan = await generateTripAI(trip);
    trip.itinerary = generatedPlan.itinerary;
    trip.budgetBreakdown = generatedPlan.budgetBreakdown;
    trip.hotelRecommendations = generatedPlan.hotelRecommendations;
    trip.travelTips = generatedPlan.travelTips;
    trip.aiStatus = "completed";
    await trip.save();

    return res.status(200).json({ message: "AI travel plan generated successfully", trip });
  } catch (error) {
    console.error("Generate Trip AI Error:", {
      name: error.name,
      status: error.status,
      code: error.code,
      type: error.type,
      message: error.message,
    });

    if (trip) {
      try {
        trip.aiStatus = "failed";
        await trip.save();
      } catch (saveError) {
        console.error("Unable to save AI generation status:", saveError);
      }
    }

    if (
      error.message === "AI trip generation is not configured" ||
      error.message === "Gemini API key is not configured"
    ) {
      return res.status(503).json({
        message: "AI planning is not configured on the server. Your trip was saved; please contact support.",
      });
    }

    if (error.status === 401 || error.status === 403) {
      return res.status(502).json({
        message: "The AI service rejected its server credentials. Your trip was saved; please contact support.",
      });
    }

    if (error.status === 429) {
      return res.status(503).json({
        message: error.code === "insufficient_quota"
          ? "AI service quota is currently unavailable. Your trip was saved; please try again later."
          : "The AI service is busy. Your trip was saved; please try again shortly.",
      });
    }

    if (error.status === 400) {
      return res.status(502).json({
        message: "The AI service could not process this plan request. Your trip was saved; please try again or contact support.",
      });
    }

    return res.status(error.status >= 500 ? 503 : 502).json({
      message: "The AI service is temporarily unavailable. Your trip was saved; please try again shortly.",
    });
  }
}

export {
  createTrip,
  getMyTrips,
  getTripById,
  generateTripAIForUser,
};
