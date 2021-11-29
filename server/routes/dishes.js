const express = require("express");
const router = express.Router();

const Dish = require("../models/Dish");

// Get all dishes
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Get dish by id
router.get("/:dishId", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    res.json(dish);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Create a dish
router.post('/', async (req, res) => {
    const {dateC, name, numberKitchen, numberRemaining, price, description, type} = req.body;
    const dish = new Dish({
        dateC: dateC, 
        name: name,
        numberKitchen: numberKitchen,
        numberRemaining: numberRemaining,
        price: price,
        description: description,
        type: type
    });

    try {
        const savedDish = await dish.save();
        res.json(savedDish);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update dish
router.patch('/:dishId', async (req, res) => {
  const { dateC, name, numberKitchen, numberRemaining, price, description, type } = req.body;
  try {
      const dishToUpdate = await Dish.updateOne(
          { id: req.params.dishId }, 
          {
            name: name, 
            numberKitchen: numberKitchen,
            numberRemaining: numberRemaining,
            price: price, 
            description: description, 
            type: type 
          }
      );
      res.json(dishToUpdate);
  } catch(err) {
      res.json({error: err.message});
  }
});

// Delete a date
router.delete("/:dishId", async (req, res) => {
  try {
      const dishToDelete = await Dish.findByIdAndDelete(req.params.dishId);
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

module.exports = router;