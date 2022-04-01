const express = require("express");
const router = express.Router();
const { getRequestingAdmin } = require('./auth');

const { DishDate } = require("../models/Command");


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
        await getRequestingAdmin(req, res);

        const savedDishDate = await dishDate.save();
        res.json(savedDishDate);
    } catch(err) {
        console.log(err);
        res.json({error: err.message});
    }
});

// Get dates and nbRemaining (for List component)
router.get("/date", async (req, res) => {
  try {
    const dish = await DishDate.find().populate('idDish').sort('dateC');
    res.json(dish);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Get dish by date
router.get("/date/:date", async (req, res) => {
  try {
    const dish = await DishDate.find({dateC: parseInt(req.params.date)}).populate('idDish');
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

// Update only nb remaining of a dish date
router.patch('/qtt', async (req, res) => {
  const { dateC, idDish, numberRemaining } = req.body;
  try {
      await getRequestingAdmin(req, res);

      const dishToUpdate = await DishDate.updateOne(
          {
            dateC : dateC,
            idDish : idDish
          },
          { $inc: { numberRemaining: +numberRemaining } }
      );
      res.json(dishToUpdate);
  } catch(err) {
      res.json({error: err.message});
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
      await getRequestingAdmin(req, res);

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

// Delete a dish from a date
router.delete("/id/:dishId", async (req, res) => {
  try {
      await getRequestingAdmin(req, res);

      const dishToDelete = await DishDate.findByIdAndDelete(req.params.dishId);
      res.json(dishToDelete);
  } catch(err) {
      res.json({error: err.message});
  }
});

module.exports = router;