const express = require("express");
const router = express.Router();

const DishDate = require("../models/DishDate");

// Create a dish
router.post('/', async (req, res) => {
    const {dateC, idDish, numberKitchen} = req.body;
    const dishDate = new DishDate({
        dateC: dateC, 
        idDish : idDish,
        numberKitchen: numberKitchen,
        numberRemaining: numberKitchen
    });

    try {
        const savedDishDate = await dishDate.save();
        res.json(savedDishDate);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get dish by date
router.get("/date/:date", async (req, res) => {
  try {
    const dish = await DishDate.find({dateC: parseInt(req.params.date)});
    res.json(dish);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Get dish by date and idDish
router.get("/dateDish/:dateC/:idDish", async (req, res) => {
  try {
    const dish = await DishDate.findOne(
        {
          dateC: parseInt(req.params.dateC),
          idDish: req.params.idDish
        }
      );
    res.json(dish);
  } catch (err) {
    res.json({ error: err.message});
  }
});

// Update nb of a dish
router.patch('/:dishId', async (req, res) => {
  const { numberKitchen, numberRemaining } = req.body;
  try {
      const dishToUpdate = await DishDate.updateOne(
          { _id: req.params.dishId }, 
          {
            numberKitchen: numberKitchen,
            numberRemaining: numberRemaining
          }
      );
      res.json(dishToUpdate);
  } catch(err) {
      res.json({error: err.message});
  }
});

// Delete all dishes from a date
router.delete("/date/:dateC", async (req, res) => {
  try {
      const dishToDelete = await DishDate.deleteMany(
        {
          dateC: req.params.dateC
        }
      );
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

// Delete all dishes from a dish
router.delete("/dish/:idDish", async (req, res) => {
  try {
      const dishToDelete = await DishDate.deleteMany(
        {
          idDish: req.params.idDish
        }
      );
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

// Delete a dish from a date
router.delete("/id/:dishId", async (req, res) => {
  try {
      const dishToDelete = await DishDate.findByIdAndDelete(req.params.dishId);
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

module.exports = router;