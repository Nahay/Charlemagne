const express = require('express');
const router = express.Router();

const CommandList = require('../models/Command');

// Get all commands list
router.get('/', async (req, res) => {
    try {
        const commandsList = await CommandList.find();
        res.json(commandsList);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get command list by id
router.get('/:commandListId', async (req, res) => {
    try {
        const commandList = await CommandList.findById(req.params.commandListId);
        res.json(commandList);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Create a command list
router.post('/', async (req, res) => {
    const { commandID, dishID, quantity } = req.body;
    const commandList = new CommandList({
        commandID: commandID,
        dishID: dishID,
        quantity: quantity
    });

    try {
        const savedCommandList = await commandList.save();
        res.json(savedCommandList);
    } catch(err) {
        res.json({error: err.message});
    }
});

module.exports = router;