const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get user by id
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Create a user
router.post('/', async (req, res) => {
    const {username, password, email, name, firstname, tel} = req.body;
    const user = new User({
        username: username,
        password: password,
        email: email,
        name: name,
        firstname: firstname,
        tel: tel
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const userToDelete = await User.findByIdAndDelete(req.params.userId);
        res.json(userToDelete);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update name/firstname
router.patch('/nf/:userId', async (req, res) => {
    const { name, firstname } = req.body;
    try {
        const userToUpdate = await User.updateOne(
            { id: req.params.userId }, { name: name, firstname: firstname }
        );
        res.json(userToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update password
router.patch('/pw/:userId', async (req, res) => {
    const { password } = req.body;
    try {
        const userToUpdate = await User.updateOne(
            { id: req.params.userId }, { password: password }
        );
        res.json(userToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});


module.exports = router;