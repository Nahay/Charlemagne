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


const DishDateSchema = Schema({
  dateC: {
    type: Number,
    required: true
  },
  idDish: {
    type: Schema.Types.ObjectId,
    ref:'Dish',
    required: true
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



module.exports = {
  Dish: model('Dish', DishSchema),
  DishDate: model('DishDate', DishDateSchema)
};