import { GoogleGenAI } from "@google/genai";

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "itinerary",
    "budgetBreakdown",
    "hotelRecommendations",
    "travelTips",
  ],

  properties: {
    itinerary: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["day", "title", "description", "activities"],
        properties: {
          day: {
            type: "integer",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          activities: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["time", "title", "description", "location"],
              properties: {
                time: {
                  type: "string",
                },
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                location: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },

    budgetBreakdown: {
      type: "object",
      additionalProperties: false,
      required: [
        "accommodation",
        "food",
        "transportation",
        "activities",
        "miscellaneous",
        "total",
        "currency",
      ],
      properties: {
        accommodation: {
          type: "number",
        },
        food: {
          type: "number",
        },
        transportation: {
          type: "number",
        },
        activities: {
          type: "number",
        },
        miscellaneous: {
          type: "number",
        },
        total: {
          type: "number",
        },
        currency: {
          type: "string",
          enum: ["INR"],
        },
      },
    },

    hotelRecommendations: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "name",
          "category",
          "description",
          "estimatedPricePerNight",
          "location",
        ],
        properties: {
          name: {
            type: "string",
          },
          category: {
            type: "string",
          },
          description: {
            type: "string",
          },
          estimatedPricePerNight: {
            type: "number",
          },
          location: {
            type: "string",
          },
        },
      },
    },

    travelTips: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
};


const generateTripAI = async (trip) => {

  // Check API key
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured");
  }

  // Calculate number of days
  const startDate = new Date(trip.startingDate);
  const endDate = new Date(trip.endDate);

  const numberOfDays = Math.max(
    1,
    Math.floor(
      (
        Date.UTC(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        ) -
        Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
      ) / 86400000
    ) + 1
  );


  // Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });


  const prompt = `
Create a practical travel plan.

Trip Details:

Destination: ${trip.destination}
Starting From: ${trip.startingFrom}

Start Date: ${trip.startingDate}
End Date: ${trip.endDate}

Number of Days: ${numberOfDays}

Budget: ${trip.budget} INR
Travelers: ${trip.travelers}

Travel Style: ${trip.travelStyle}
Hotel Preference: ${trip.hotelPreference}

Additional Notes:
${trip.notes || "None"}


IMPORTANT RULES:

1. Create exactly ${numberOfDays} itinerary days.
2. All prices must be numeric values in INR.
3. Budget values are for the full group.
4. estimatedPricePerNight is per night.
5. Give realistic approximate prices.
6. Hotel recommendations are estimates, NOT live availability.
7. Do not include URLs.
8. Return only JSON matching the provided schema.
9. Make the itinerary practical and realistic.
10. Consider the traveler's budget, number of travelers and travel style.
`;


  try {

    let response;
    const models = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.7-flash"];

    for (const [index, model] of models.entries()) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema,
            temperature: 0.7,
          },
        });
        break;
      } catch (error) {
        const isTemporaryServiceError = error.status === 429 || error.status === 503;
        if (!isTemporaryServiceError || index === models.length - 1) {
          throw error;
        }
        console.warn(`Gemini model ${model} unavailable; trying ${models[index + 1]}.`);
      }
    }


    // Gemini response
    const outputText = response.text;

    if (!outputText?.trim()) {
      throw new Error("Gemini returned an empty travel plan");
    }


    let result;

    try {
      result = JSON.parse(outputText);
    } catch (error) {
      console.error("Gemini JSON parse error:", error);
      console.error("Gemini response:", outputText);

      throw new Error("Gemini returned invalid travel plan data");
    }


    // Validate response
    if (
      !Array.isArray(result.itinerary) ||
      result.itinerary.length !== numberOfDays ||
      !result.budgetBreakdown ||
      !Array.isArray(result.hotelRecommendations) ||
      !Array.isArray(result.travelTips)
    ) {
      throw new Error("Gemini returned incomplete travel plan data");
    }


    return result;

  } catch (error) {

    console.error("Gemini AI Error:", error);
    throw error;
  }
};


export default generateTripAI;