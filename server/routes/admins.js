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

     const adminUsername = decoded.username;

     const adminRequesting = await Admin.findOne({ username: adminUsername });
     // retourne cette administrateur
     return adminRequesting;
    } catch(err) {
        console.log(err);
        return res.send({ error: err.message });
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

        const saveAdmin = await newAdmin.save();

        return res.send({ success: true, message: "Signed up.", adminRequesting: adminRequesting.username, savedAdmin });
    } catch(err) {
        console.log(err);
        return res.send({ error: err.message, success: false, message:"Invalid token." });
    }
});

// GET ---------------------------------------------------------------------------------------------------------------------------------------

// All admins
router.get("/", async (req, res) => {
    try {
      const adminRequesting = await getRequestingAdmin(req, res);

      const admins = await Admin.find();
      return res.send({ success: true, adminRequesting: adminRequesting.username, admins });
    } catch (err) {
      return res.send({ error: err.message, success: false });
    }
  });

// Admin by id
router.get('/:adminId', async (req, res) => {
    try {
        const adminRequesting = await getRequestingAdmin(req, res); 
        
        const admin = await Admin.findById(req.params.adminId);
        return res.send({success: true, adminRequesting: adminRequesting.username, admin });
    } catch(err) {
        res.send({ error: err.message, success: false });
    }
});

// Admin by username
router.get("/admin/:adminUsername", async (req, res) => {  
    try {
      const adminRequesting = await getRequestingAdmin(req, res);  

      const adminFound = await Admin.findOne({username: req.params.adminUsername});  
      return res.send({ success: true, message: "Valid token", adminRequesting: adminRequesting.username, adminFound });
    } catch (err) {
      console.log(err);
      return res.send({ error: err.message, success: false });
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
        return res.send({ success: true, message: "Admin updated successfully", adminRequesting: adminRequesting.username, adminUpdated })
    } catch(err) {
        console.log(err);
        return res.send({error: err.message});
    }
});

// Update by username
router.patch('/admin/:adminUsername', async (req, res) => {
    const { password } = req.body;
    let admin = new Admin();
    try {
        const adminRequesting = await getRequestingAdmin(req, res);

        const adminUpdated = await Admin.updateOne( { username: req.params.adminUsername }, { password: admin.generateHash(password) } );
        return res.send({ success: true, message: "Admin updated successfully", adminRequesting: adminRequesting.username, adminUpdated })
    } catch(err) {
        console.log(err);
        return res.send({error: err.message});
    }
});

// Delete an admin
router.delete('/:adminId', async (req, res) => {
    try {
        const adminRequesting = await getRequestingAdmin(req, res); 

        const adminDeleted = await Admin.findByIdAndDelete(req.params.adminId);
        return res.send({success: true, adminRequesting: adminRequesting.username, adminDeleted })
    } catch(err) {
        console.log(err);
        return res.send({error: err.message});
    }
});

// SIGN IN ------------------------------------------------------------------------------------------------------------------------------------

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    
    // if the fields are empty => error
    if (!username) return res.send({ success: false, message: "Error: Username cannot be blank."});
    if (!password) return res.send({ success: false, message: "Error: Password cannot be blank."});
  
    try {
      const admin = await Admin.findOne({ username });  
      // Compare le mot de passe entré avec le hash
      if (!admin.validPassword(password)) return res.send({ success: false, message: "Error: Invalid password while testing" });
      // ajoute les valeurs assignées dans le token
      const token = jwt.sign({ username, auth: true }, "3NgAMe1R4Hco2xMZ8q9PnzT7v8fF2wL56");
      return res.send({ success: true, message: "Valid sign in", token });
    } catch (err) {
      console.log(err);
      return res.send({ success: false, message: "Error: Invalid." });
    }  
});

module.exports = router;