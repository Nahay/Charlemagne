const express = require('express');
const router = express.Router();

const Date = require('../models/Date');

// Get all calendar dates
router.get('/', async (req, res) => {
    try {
        const dates = await Date.find();
        res.json(dates);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get calendar date by date
router.get('/date/:calendarDate', async (req, res) => {
    try {
        const date = await Date.findOne({
            dateC: parseInt(req.params.calendarDate)
        });
        res.json(date);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get calendar dates by visibility true
router.get('/visibility', async (req, res) => {
    try {
        const date = await Date.find({
            visibility: true
        });
        res.json(date);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Create a date
router.post('/', async (req, res) => {
    const {dateC, visibility, comment, timeMin, timeMax } = req.body;
    const date = new Date({
        dateC: dateC,
        visibility: visibility,
        comment: comment, 
        timeMin: timeMin,
        timeMax: timeMax
    });

    try {
        const savedDate = await date.save();
        res.json(savedDate);
    } catch(err) {
        console.log(err);
        res.json({error: err.message});
    }
});

// Delete a date
router.delete("/:date", async (req, res) => {
    try {
        const dateToDelete = await Date.findOneAndDelete({dateC: req.params.date});
        res.json(dateToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update a date
router.patch('/:calendarDate', async (req, res) => {
    const { visibility, comment, timeMin, timeMax } = req.body;
    try {
        const dateToUpdate = await Date.updateOne(
            { dateC: req.params.calendarDate },
            { visibility: visibility, comment:comment, timeMin: timeMin, timeMax: timeMax }
        );
        res.json(dateToUpdate);
    } catch(err) {
        console.log(err);
        res.json({error: err.message});
    }
});


module.exports = router;