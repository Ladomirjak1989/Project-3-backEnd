const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Flight model to whatever makes sense in this case
const flightSchema = new Schema(
  {
    "type": {
      type: String,
      required: [true, "type is required."],
    },

    "origin": {
      type: String,
      required: [true, "origin is required."],
    },

    "destination": {
      type: String,
      required: [true, "destination is required."],
    },

    "destinationCity": {
      type: String,
      required: [true, "destinationCity is required."],
    },

    "city": {
      type: String,
      required: [true, "city is required."],
    },

    "departureDate": {
      type: String,
      required: [true, " departureDate is required."],
    },

    "returnDate": {
      type: String,
      required: [true, " returnDate is required."],
    },

    "capacities": {
      type: Number,
      required: [true, " capacities is required."],
    },

    "price": {
      type: String,
      required: [true, " price is required."],
    },

    "flightDates": {
      type: String,
      required: [true, " flightDates is required."],
    },

    "flightOffers": {
      type: String,
      required: [true, " flightOffers is required."],
    },

    "currencies": {
      type: String,
      required: [true, " currencies is required."],
    },

    "duration": {
      type: String,
      required: [true, " currencies is required."],
    },


    "detailedName": {
      type: String,
      required: [true, " detailedName is required."],
    },

    "subType": {
      type: String,
      required: [true, " subType is required."],
    },

    "nonStop": {
      type: String,
      required: [true, " nonStop is required."],
    },

    "oneWay": {
      type: String,
      required: [true, " nonStop is required."],
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Flight = model("Flight", flightSchema);

module.exports = Flight;
