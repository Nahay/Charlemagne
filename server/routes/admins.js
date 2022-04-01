const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getRequestingAdmin } = require("./auth");

const Admin = require('../models/Admin');

// CREATE ------------------------------------------------------------------------------------------------------------------------------

// Admin 
router.post('/', async (req, res) => {
    const {username, password} = req.body;
    try {
        await getRequestingAdmin(req, res);

        const newAdmin = new Admin({username, password});
        newAdmin.password = newAdmin.generateHash(password);

        const savedAdmin = await newAdmin.save();

        return res.json({ success: true, message: "Signed up.", savedAdmin });

    } catch(err) {
        return res.json({ err, success: false });
    }
});

// GET ---------------------------------------------------------------------------------------------------------------------------------------

// All admins
router.get("/", async (req, res) => {
    try {
      await getRequestingAdmin(req, res);

      const admins = await Admin.find();
      res.json({ success: true, admins });
    } catch (err) {
      res.json({ err, success: false });
    }
  });

// Admin by id
router.get('/:adminId', async (req, res) => {
    try {
        await getRequestingAdmin(req, res);
        
        const admin = await Admin.findById(req.params.adminId);

        if(admin) return res.json({success: true, admin });
        return res.json({success: false, message: "No Admin was founded"});
    } catch(err) {
        res.send({ err, success: false });
    }
});

// Admin by username
router.get("/admin/:adminUsername", async (req, res) => {  
    try {
      await getRequestingAdmin(req, res);  

      const adminFound = await Admin.findOne({username: req.params.adminUsername});

      if (adminFound) return res.json({ success: true, message: "Valid token", adminFound });
      return res.json({success: false, message: "No Admin was founded"});

    } catch (err) {
        console.log(`${err}`);
      res.json({ err, success: false });
    }
});

// UPDATE & DELETE --------------------------------------------------------------------------------------------------------------------------------

// Update by id
router.patch('/:adminId', async (req, res) => {
    const { password } = req.body;
    let admin = new Admin();
    try {
        await getRequestingAdmin(req, res);

        const adminUpdated = await Admin.updateOne( { _id: req.params.adminId }, { password: admin.generateHash(password) } );
        res.json({ success: true, message: "Admin updated successfully", adminUpdated })
    } catch(err) {
        console.log(`${err}`);
        res.json({err});
    }
});


// Delete an admin
router.delete('/:adminId', async (req, res) => {
    try {
        await getRequestingAdmin(req, res); 

        const adminDeleted = await Admin.findByIdAndDelete(req.params.adminId);
        res.json({success: true, adminDeleted })
    } catch(err) {
        console.log(`${err}`);
        res.json({err});
    }
});

// Delete an admin by username
router.delete('/admin/:adminUsername', async (req, res) => {
    try {
        await getRequestingAdmin(req, res); 

        const adminDeleted = await Admin.findOneAndDelete({username: req.params.adminUsername});
        res.json({success: true, adminDeleted })
    } catch(err) {
        console.log(`${err}`);
        res.json({err, success: false});
    }
});

// SIGN IN ------------------------------------------------------------------------------------------------------------------------------------

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    
    // if the fields are empty => error
    if (!username) return res.json({ success: false, message: "Error: Username cannot be blank."});
    if (!password) return res.json({ success: false, message: "Error: Password cannot be blank."});
  
    try {
        const admin = await Admin.findOne({ username });  
        // Compare le mot de passe entré avec le hash
        if (!admin.validPassword(password)) return res.json({ success: false, message: "Error: Invalid password while testing" });
        // ajoute les valeurs assignées dans le token
        const token = jwt.sign({ _id: admin._id, auth: true }, process.env.JWT_TOKEN);
        res.json({ success: true, message: "Valid sign in", token });

    } catch (err) {
        console.log(`${err}`);
        res.json({ err, success: false });
    }
});

module.exports = router;