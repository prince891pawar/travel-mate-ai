import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateTripAI = async (trip) => {
  const response = await openai.responses.create({
    model: "gpt-5.6-luna",

    instructions: `
      You are an AI travel planner for a travel application.

      Create a practical and realistic travel plan based on the user's trip details.

      Include:
      1. Day-by-day itinerary
      2. Activities for each day
      3. Estimated daily budget
      4. Hotel suggestions
      5. Useful travel tips

      Keep the response useful and easy to understand.
    `,

    input: `
      Destination: ${trip.destination}
      Starting From: ${trip.startingFrom}
      Start Date: ${trip.startDate}
      End Date: ${trip.endDate}
      Budget: ${trip.budget}
      Travelers: ${trip.travelers}
      Travel Style: ${trip.travelStyle}
      Hotel Preference: ${trip.hotelPreference}
      Notes: ${trip.notes || "No additional notes"}
    `,
  });

  return response.output_text;
};

export default generateTripAI;