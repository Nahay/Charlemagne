const express = require('express');
const router = express.Router();

const Param = require('../models/Param');

// Create a param
router.post('/', async (req, res) => {
    const {sentence, type} = req.body;
    const param = new Param({
        sentence: sentence,
        type: type
    });

    try {
        const savedParam = await param.save();
        res.json(savedParam);
    } catch(err) {
        res.json({error: err.message});
    }
});


// Get param by type
router.get("/:type", async (req, res) => {
    try {
      const param = await Param.findOne({type: req.params.type});
      res.json(param);
    } catch (err) {
      res.json({ error: err.message });
    }
});


// Update param
router.patch('/:type', async (req, res) => {
    const { sentence } = req.body;
    try {
        const paramToUpdate = await Param.updateOne(
            { type: req.params.type }, { sentence: sentence }
        );
        res.json(paramToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});

module.exports = router;