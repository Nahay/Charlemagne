const express = require('express');
const router = express.Router();

const Param = require('../models/Param');

// Create a param
router.post('/', async (req, res) => {
    const {sentence} = req.body;
    const param = new Param({
        sentence: sentence,
    });

    try {
        const savedParam = await param.save();
        res.json(savedParam);
    } catch(err) {
        res.json({error: err.message});
    }
});


// Get param by id
router.get("/:paramId", async (req, res) => {
    try {
      const param = await Param.findById(req.params.paramId);
      res.json(param);
    } catch (err) {
      res.json({ error: err.message });
    }
});


// Update setence
router.patch('/:paramId', async (req, res) => {
    const { sentence } = req.body;
    try {
        const paramToUpdate = await Param.updateOne(
            { _id: req.params.paramId }, { sentence: sentence }
        );
        res.json(paramToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});

module.exports = router;