const express = require('express');
const router = express.Router();

const { Command, CommandList } = require('../models/Command');

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

router.get('/commandAndDish/:commandID', async (req, res) => {
    try {
        const commandList = await CommandList.find({ command: req.params.commandID }).populate('dishID');
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
        const commandList = await CommandList.find().populate({ path: 'command', match: { dateC: req.params.date }});

        const currentCommands = commandList.map(c => c.command).filter(c => c);

        if (currentCommands.length != 0) {
            res.json({success: true, message: "Commands successfully retrieved !", commands: currentCommands})
        }
        else {
            res.json({success: false, message: "There are no commands on this date." })
        }
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
        const currentCommand = await Command.findById(command);
        currentCommand.list.push(savedCommandList);
        await currentCommand.save();
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

// Delete all commands from a command list
router.delete("/commands/:commandID", async (req, res) => {
    try {
        const commandListToDelete = await CommandList.deleteMany({command: req.params.commandID});
        res.json(commandListToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
  });


module.exports = router;