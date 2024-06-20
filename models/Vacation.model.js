const { Schema, model } = require("mongoose");

const vacationSchema = new Schema(
  {
    destination: {
      type: String,
      required: [true, "Destination is required."],
    },
    duration: {
      type: String,
      required: [true, "Duration is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    currency: {
      type: String,
      required: [true, "Currency is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    accommodation: {
      name: { type: String, required: [true, "Accommodation name is required."] },
      type: { type: String, required: [true, "Accommodation type is required."] },
      rating: { type: Number, required: [true, "Accommodation rating is required."] },
      address: { type: String, required: [true, "Accommodation address is required."] },
      amenities: { type: [String], required: [true, "Amenities are required."] }
    },
    activities: {
      type: [String],
      required: [true, "Activities are required."],
    },
    images: {
      type: [String],
      required: [true, "Images are required."],
    },
    reviews: [
      {
        user: { type: String, required: [true, "User is required."] },
        rating: { type: Number, required: [true, "Rating is required."] },
        comment: { type: String, required: [true, "Comment is required."] }
      }
    ]
  },
  {
    timestamps: true, // This adds createdAt and updatedAt properties
  }
);

const Vacation = model("Vacation", vacationSchema);

module.exports = Vacation;
