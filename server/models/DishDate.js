const { Schema, model } = require('mongoose');


const DishDateSchema = Schema({
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

module.exports = model('DishDate', DishDateSchema);