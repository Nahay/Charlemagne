const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// FUNCTIONS ------------------------------------------------------------------------------------------------------------------------------

const getRequestingAdmin = async(req, res) => {
    try {
     // récupère le token du header de la requête
     const token = req.headers["x-access-token"];
     // vérifie l'admin qui fait la requête est bien la seule et unique personne la faisant
     const decoded = jwt.verify(token, "3NgAMe1R4Hco2xMZ8q9PnzT7v8fF2wL56");
     const adminId = decoded._id;

     const adminRequesting = await Admin.findById({ _id: adminId });
     // retourne cette administrateur
     return adminRequesting;
    } catch(err) {
        console.log(err);
        res.json({ error: err.message });
    }
}

// CREATE ------------------------------------------------------------------------------------------------------------------------------

// Admin 
router.post('/', async (req, res) => {
    const {username, password} = req.body;
    try {
        const adminRequesting = await getRequestingAdmin(req, res);

        const newAdmin = new Admin({username, password});
        newAdmin.password = newAdmin.generateHash(password);

        const savedAdmin = await newAdmin.save();

        res.json({ success: true, message: "Signed up.", adminRequesting: adminRequesting._id, savedAdmin });
    } catch(err) {
        console.log(err);
        res.json({ error: err.message, success: false, message:"Invalid token." });
    }
});

// GET ---------------------------------------------------------------------------------------------------------------------------------------

// All admins
router.get("/", async (req, res) => {
    try {
      const adminRequesting = await getRequestingAdmin(req, res);

      const admins = await Admin.find();
      res.json({ success: true, adminRequesting: adminRequesting._id, admins });
    } catch (err) {
      res.json({ error: err.message, success: false });
    }
  });

// Admin by id
router.get('/:adminId', async (req, res) => {
    try {
        const adminRequesting = await getRequestingAdmin(req, res); 
        
        const admin = await Admin.findById(req.params.adminId);

        if(admin) return res.json({success: true, adminRequesting: adminRequesting._id, admin });
        return res.json({success: false, message: "No Admin was founded"});
    } catch(err) {
        res.send({ error: err.message, success: false });
    }
});

// Admin by username
router.get("/admin/:adminUsername", async (req, res) => {  
    try {
      const adminRequesting = await getRequestingAdmin(req, res);  

      const adminFound = await Admin.findOne({username: req.params.adminUsername});

      if (adminFound) return res.json({ success: true, message: "Valid token", adminRequesting: adminRequesting._id, adminFound });
      return res.json({success: false, message: "No Admin was founded"});

    } catch (err) {
      console.log(err);
      res.json({ error: err.message, success: false });
    }
});

// UPDATE & DELETE --------------------------------------------------------------------------------------------------------------------------------

// Update by id
router.patch('/:adminId', async (req, res) => {
    const { password } = req.body;
    let admin = new Admin();
    try {
        const adminRequesting = await getRequestingAdmin(req, res);

        const adminUpdated = await Admin.updateOne( { _id: req.params.adminId }, { password: admin.generateHash(password) } );
        res.json({ success: true, message: "Admin updated successfully", adminRequesting: adminRequesting._id, adminUpdated })
    } catch(err) {
        console.log(err);
        res.json({error: err.message});
    }
});


// Delete an admin
router.delete('/:adminId', async (req, res) => {
    try {
        const adminRequesting = await getRequestingAdmin(req, res); 

        const adminDeleted = await Admin.findByIdAndDelete(req.params.adminId);
        res.json({success: true, adminRequesting: adminRequesting._id, adminDeleted })
    } catch(err) {
        console.log(err);
        res.json({error: err.message});
    }
});

// Delete an admin by username
router.delete('/admin/:adminUsername', async (req, res) => {
    try {
        const adminRequesting = await getRequestingAdmin(req, res); 

        const adminDeleted = await Admin.findOneAndDelete({username: req.params.adminUsername});
        res.json({success: true, adminRequesting: adminRequesting._id, adminDeleted })
    } catch(err) {
        console.log(err);
        res.json({error: err.message});
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
      const token = jwt.sign({ _id: admin._id, auth: true }, "3NgAMe1R4Hco2xMZ8q9PnzT7v8fF2wL56");
      res.json({ success: true, message: "Valid sign in", token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error: Invalid." });
    }  
});

module.exports = router;