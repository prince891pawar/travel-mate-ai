import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
     user: {
        type: String,
        ref: "User",
        required: true
     },

     destination: {
        type: String,
        required: true,
        trim: true
     },

     startingForm: {
        type: String,
        required: true,
        trim: true
     },

     startingDate: {
        type: Number,
        required: true,
        trim: true
     },

     endDate: {
      type: Date,
      required: true,
    },

    budget: {
        type: Date,
        enum: ["budget", "standard", "luxury"],
        required: true,
    },

    travelers: {
      type: String,
      enum: ["solo", "couple", "friends", "family"],
      required: true,
    },

    travelStyle: {
      type: String,
      enum: [
        "adventure",
        "relaxation",
        "nature",
        "cultural",
        "food",
        "nightlife",
      ],
      required: true,
    },

    hotelPreference: {
      type: String,
      enum: ["3-star", "4-star", "5-star"],
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
