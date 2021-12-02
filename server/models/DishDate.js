const mongoose = require("mongoose");

const DishDateSchema = mongoose.Schema({
  dateC: {
    type: Number,
    required: true,
  },
  idDish: {
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
  }
});

module.exports = mongoose.model('dish-date', DishDateSchema);