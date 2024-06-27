const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

const roomSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  availability: { type: Boolean, required: true }
});

const hotelSchema = new Schema({
  name: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    mapUrl: { type: String, required: true }
  },
  accommodation:{
  rating: { type: Number, required: true },
  },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  amenities: [{ type: String, required: true }],
  popularFilters: [{ type: String, required: true }],
  board: { type: String, required: true },
  cancellationPolicy: { type: String, required: true },
  rooms: [roomSchema],
  images: [{ type: String, required: true }],
  reviews: [reviewSchema],
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true }
  }
}, {
  timestamps: true // This adds createdAt and updatedAt properties
});

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
