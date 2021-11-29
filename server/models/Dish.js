const mongoose = require("mongoose");

const DishSchema = mongoose.Schema({
  dateC: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  numberKitchen: {
    type: Number,
    required: true,
  },
  numberRemaining: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('dishes', DishSchema);