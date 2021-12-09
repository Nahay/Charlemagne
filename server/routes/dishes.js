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

// Get dish by name
router.get("/name/:dishName", async (req, res) => {
  try {
    const dish = await Dish.findOne({name: req.params.dishName});
    res.json(dish);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Count dish by name
router.get("/findname/:dishName", async (req, res) => {
  try {   
    const dish = await Dish.countDocuments({name: req.params.dishName});
    res.json(dish);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Create a dish
router.post('/', async (req, res) => {
    const {
      name, price, description, type} = req.body;
    const dish = new Dish({ 
        name: name,
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
  const { name, price, description, type } = req.body;
  try {

      const dishToUpdate = await Dish.updateOne(
          { _id: req.params.dishId }, 
          {
            name: name, 
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

// Delete a dish
router.delete("/:dishId", async (req, res) => {
  try {
      const dishToDelete = await Dish.findByIdAndDelete(req.params.dishId);
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

module.exports = router;