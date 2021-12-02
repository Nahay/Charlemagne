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

// Create a date
router.post('/', async (req, res) => {
    const {dateC, visibility, comment} = req.body;
    const date = new Date({
        dateC: dateC,
        visibility: visibility,
        comment: comment
    });

    try {
        const savedDate = await date.save();
        res.json(savedDate);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Delete a date
router.delete("/:calendarDate", async (req, res) => {
    try {
        const dateToDelete = await Date.findByIdAndDelete(req.params.calendarDate);
        res.json(dateToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update a date
router.patch('/:calendarDate', async (req, res) => {
    const { visibility, comment } = req.body;
    try {
        const dateToUpdate = await Date.updateOne(
            { dateC: req.params.calendarDate },
            { visibility: visibility, comment:comment }
        );
        res.json(dateToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});


module.exports = router;