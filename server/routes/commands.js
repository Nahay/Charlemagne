const express = require('express');
const router = express.Router();

const Command = require('../models/Command');

// Get all commands
router.get('/', async (req, res) => {
    try {
        const commands = await Command.find();
        res.json(commands);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get command by id
router.get('/:commandId', async (req, res) => {
    try {
        const command = await Command.findById(req.params.commandId);
        res.json(command);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Create a command
router.post('/', async (req, res) => {
    const {userID, dateC, time, paid, container, comment, total} = req.body;
    const command = new Command({
        userID: userID,
        dateC: dateC,
        time: time,
        paid: paid,
        container: container,
        comment: comment,
        total: total
    });

    try {
        const savedCommand = await command.save();
        res.json(savedCommand);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Delete a command
router.delete("/:commandId", async (req, res) => {
    try {
        const commandToDelete = await Command.findByIdAndDelete(req.params.commandId);
        res.json(commandToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update paid
router.patch('/:commandId', async (req, res) => {
    const { paid } = req.body;
    try {
        const commandToUpdate = await Command.updateOne(
            { _id: req.params.commandId }, { paid: paid }
        );
        res.json(commandToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});


module.exports = router;