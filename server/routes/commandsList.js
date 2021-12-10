const express = require('express');
const router = express.Router();

const { CommandList } = require('../models/Command');


// Get all commands list
router.get('/', async (req, res) => {
    try {
        const commandsList = await CommandList.find();
        res.json(commandsList);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get command list by command
router.get('/command/:commandID', async (req, res) => {
    try {
        const commandList = await CommandList.find(
                { command: req.params.commandID }
            );
        res.json(commandList);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get one command list by dish
router.get('/dish/:dishID', async (req, res) => {
    try {
        const commandList = await CommandList.findOne(
                { dishID: req.params.dishID }
            );
        res.json(commandList);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get one command list by date command
router.get('/date/:date', async (req, res) => {
    try {
        const commandList = await CommandList.findOne().
            populate(
                {
                    path: 'command',
                    match: { dateC: req.params.date }
                }
            );
        res.json(commandList);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Create a command list
router.post('/', async (req, res) => {
    const { command, dishID, quantity } = req.body;
    const commandList = new CommandList({
        command: command,
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

// Update quantity
router.patch('/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        const commandToUpdate = await CommandList.updateOne(
            { _id: req.params.id },
            {
                quantity: quantity
            }
        );
        res.json(commandToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Delete a command
router.delete("/:id", async (req, res) => {
    try {
        const commandToDelete = await CommandList.findByIdAndDelete(req.params.id);
        res.json(commandToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Delete a command by command
router.delete("/command/:commandID", async (req, res) => {
    try {
        const commandToDelete = await CommandList.findOneAndDelete(
                { command: req.params.commandID },
            );
        res.json(commandToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
});


module.exports = router;