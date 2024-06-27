const { Schema, model } = require('mongoose');

const citySchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    population: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt properties
  }
);

const City = model('City', citySchema);

module.exports = City;
