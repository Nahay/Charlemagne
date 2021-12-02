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
router.get("/:date", async (req, res) => {
  try {
    const dish = await DishDate.find({dateC: parseInt(req.params.date)});
    res.json(dish);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Count dish by name and date
router.get("/findDateName", async (req, res) => {
    const {dateC, idDish} = req.body;
    try {   
      const dish = await DishDate.countDocuments({
          dateC: dateC,
          idDish: idDish
        });
      res.json(dish);
    } catch (err) {
      res.json({ error: err.message });
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

// Delete a dish from a date
router.delete("/:dishId", async (req, res) => {
  try {
      const dishToDelete = await DishDate.findByIdAndDelete(req.params.dishId);
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

module.exports = router;