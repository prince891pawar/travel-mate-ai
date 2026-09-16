import Trip from "../models/Trip"

const createTrip = async (req, res) => {
  try {
    const {
      destination,
      startingFrom,
      startDate,
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
      !startDate ||
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

    // Create trip
    const trip = await Trip.create({
      user: req.user,
      destination,
      startingFrom,
      startDate,
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

module.exports = {
  createTrip,
};