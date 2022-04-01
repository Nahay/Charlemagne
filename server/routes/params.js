const express = require('express');
const router = express.Router();
const { getRequestingAdmin } = require('./auth');

const Param = require('../models/Param');


// Get param by type
router.get("/:type", async (req, res) => {
    try {
      const param = await Param.findOne({type: req.params.type});
      res.json(param);
    } catch (err) {
      res.json({ err });
    }
});


// Update param
router.patch('/:type', async (req, res) => {
    const { sentence } = req.body;

    try {
        await getRequestingAdmin(req, res);

        const paramToUpdate = await Param.updateOne(
            { type: req.params.type }, { sentence: sentence }
        );
        res.json({paramToUpdate});

    } catch(err) {
        res.json({err});
    }
});

module.exports = router;