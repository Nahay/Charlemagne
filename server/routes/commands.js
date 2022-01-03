const express = require('express');
const router = express.Router();

const { Command } = require('../models/Command');

// Get all commands
router.get('/', async (req, res) => {
    try {
        const commands = await Command.find();
        res.json(commands);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get command by date
router.get('/:dateC', async (req, res) => {
    try {
        const command = await Command.find({ dateC: req.params.dateC }).populate('user').populate('list');
        res.json(command);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get command by user
router.get('/user/:user', async (req, res) => {
    try {
        const command = await Command.find({ user: req.params.user});
        res.json(command);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Create a command
router.post('/', async (req, res) => {
    const {user, dateC, timeC, paid, container, comment, total} = req.body;
    const command = new Command({
        user: user,
        dateC: dateC,
        timeC: timeC,
        paid: paid,
        container: container,
        comment: comment,
        total: total
    });

    try {
        const savedCommand = await command.save();
        res.json(savedCommand);
    } catch(err) {
        console.log(err);
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

// Update a command
router.patch('/:commandId', async (req, res) => {
    const { timeC, paid, container, comment, total } = req.body;
    try {
        const commandToUpdate = await Command.updateOne(
            { _id: req.params.commandId },
            {
                timeC : timeC,
                paid : paid,
                container: container, 
                comment: comment,
                total: total
            }
        );
        res.json(commandToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});


module.exports = router;