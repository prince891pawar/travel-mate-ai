import Trip from "../models/Trip.js"

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
      !hotelPreference ||
      !notes
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
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

export {
  createTrip,
  getMyTrips
};
