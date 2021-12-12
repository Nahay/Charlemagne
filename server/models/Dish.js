const { Schema, model } = require('mongoose');


const DishSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
});

module.exports = model('Dish', DishSchema);