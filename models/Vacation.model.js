const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Vacation model to whatever makes sense in this case
const vacationSchema = new Schema(
  {
    "destination": {
      type: String,
      required: [true, "destination is required."],
    },

    "duration": {
      type: String,
      required: [true, "duration is required."],
    },

    "price": {
      type: Number,
      required: [true, "price is required."],
    },

    "currency": {
      type: String,
      required: [true, " currency is required."],
    },

    "description": {
      type: String,
      required: [true, "description is required."],
    },

    "accommodation": {
      type: String,
      required: [true, " accommodation is required."],
    },

    "amenities": {
      type: String,
      required: [true, " amenities is required."],
    },

    "activities": {
      type: String,
      required: [true, " activities is required."],
    },

    "images": {
      type: String,
      required: [true, " images is required."],
    },

    "reviews": {
      type: String,
      required: [true, " reviews is required."],
    },

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Vacation = model("Vacation", vacationSchema);

module.exports = Vacation;
