const { Schema, model } = require('mongoose');

const cruiseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
     
    },
    type: {
      type: String,
      required: true,
     
    },
    departure: {
      type: String,
      required: true,
     
    },
    destination: {
      type: String,
      required: true,
     
    },
    duration: {
      type: String,
      required: true,
     
    },
    month: {
      type: String,
      required: true,
      
    },
    visitingCities: {
      type: [String],
      required: true,
     
    },
    images: {
      type: [String],
      required: [true,"Activities are required."],
      
    },
    pricePerPerson: {
      type: Number,
      required: true,
     
    },
    totalPrice: {
      type: Number,
      required: true,
      
    },
    details: {
      description: {
        type: String,
        required: true,
        
      },
      amenities: {
        type: [String],
        required: true,
       
      }
    }
  },
  {
    timestamps: true // This adds createdAt and updatedAt properties
  }
);

const Cruise = model('Cruise', cruiseSchema);

module.exports = Cruise;
