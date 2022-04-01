const express = require("express");
const router = express.Router();
const { getRequestingAdmin } = require('./auth');

const { Dish } = require("../models/Command");


// Get all dishes
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find().sort('name');
    res.json(dishes);
  } catch (err) {
    res.json({ err });
  }
});

// Get all visible dishes
router.get("/visible", async (req, res) => {
  try {
    const dishes = await Dish.find({visible: true}).sort('name');
    res.json(dishes);
  } catch (err) {
    res.json({ err });
  }
});

// Get all visible dishes
router.get("/invisible", async (req, res) => {
  try {
    const dishes = await Dish.find({visible: false}).sort('name');
    res.json(dishes);
  } catch (err) {
    res.json({ err });
  }
});


// Get dish by id
router.get("/:dishId", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    res.json(dish);
  } catch (err) {
    res.json({ err });
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

// Get dates and nb remaining
router.get("/number-remaining", async (req, res) => {
  try {

  } catch (err) {
    res.json({error: err.message});
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
        await getRequestingAdmin(req, res);

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
      await getRequestingAdmin(req, res);

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
      console.log(err);
      res.json({error: err.message});
  }
});

// Hide a dish
router.patch("/hide/:dishId", async (req, res) => {
  try {
      await getRequestingAdmin(req, res);

      const dishToDelete = await Dish.findOneAndUpdate(
        {_id: req.params.dishId },
        {
          visible: false
        }
        );
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

// Unhide a dish
router.patch("/unhide/:dishId", async (req, res) => {
  try {
      await getRequestingAdmin(req, res);

      const dishToUnhide = await Dish.findOneAndUpdate(
        {_id: req.params.dishId },
        {
          visible: true
        }
        );
      res.json(dishToUnhide);
  } catch(err) {
      res.json({error: err.message});
  }
});

module.exports = router;