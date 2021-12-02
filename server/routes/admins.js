const express = require('express');
const router = express.Router();

const Admin = require('../models/Admin');

// Create an admin
router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const admin = new Admin({
        username: username,
        password: password
    });

    try {
        const savedAdmin = await admin.save();
        res.json(savedAdmin);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get all admins
router.get("/", async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (err) {
      res.json({ error: err.message });
    }
  });

// Get an admin by id
router.get('/:adminId', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.adminId);
        res.json(admin);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Get an admin by username
router.get('/username/:adminUsername', async (req, res) => {
    try {
        const admin = await Admin.findOne({username: req.params.adminUsername});
        res.json(admin);
    } catch(err) {
        res.json({error: err.message});
    }
});

// Update password
router.patch('/:adminId', async (req, res) => {
    const { password } = req.body;
    try {
        const adminToUpdate = await Admin.updateOne(
            { _id: req.params.adminId }, { password: password }
        );
        res.json(adminToUpdate);
    } catch(err) {
        res.json({error: err.message});
    }
});

module.exports = router;