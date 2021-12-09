const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

// FUNCTIONS ------------------------------------------------------------------------------------------------------------------------------

const getRequestingAdmin = async(req, res) => {
    try {
     // on récupère le token, et on vérifie l'admin qui fait la requête est bien la seule et unique personne la faisant
     const token = req.headers["x-access-token"];
     const decoded = jwt.verify(token, "3NgAMe1R4Hco2xMZ8q9PnzT7v8fF2wL56");
     const adminUsername = decoded.username;
     const adminRequesting = await Admin.findOne({ username: adminUsername });
     // on retourne cette administrateur
     return adminRequesting;
    } catch(err) {
        console.log(err);
        return res.send({ error: err.message });
    }
}

// CREATE ------------------------------------------------------------------------------------------------------------------------------

// User
router.post('/', async (req, res) => {
    const {username, password, name, firstname, email, tel} = req.body;
    try {
        const adminRequesting = await getRequestingAdmin(req, res);

        const newUser = new User({username, password, name, firstname, email, tel});
        newUser.password = newUser.generateHash(password);

        const user = await newUser.save();

        return res.send({ success: true, message: "Signed up.", adminRequesting: adminRequesting.username, savedUser: { user } });
    } catch(err) {
        console.log(err);
        return res.send({ error: err.message, success: false, message:"Invalid token." });
    }
});

// GET ---------------------------------------------------------------------------------------------------------------------------------------

// All users
router.get("/", async (req, res) => {
    try {
      const adminRequesting = await getRequestingAdmin(req, res);

      const users = await User.find();
      return res.send({ success: true, adminRequesting: adminRequesting.username, users: users });
    } catch (err) {
      return res.send({ error: err.message });
    }
});

// User by id
router.get('/:userId', async (req, res) => {
    try {
        const adminRequesting = await getRequestingAdmin(req, res); 
        const user = await User.findById(req.params.userId);
        return res.send({success: true, adminRequesting: adminRequesting.username, user: user});
    } catch(err) {
        return res.send({ error: err.message, success: false });
    }
});

// User by username
router.get("/user/:username", async (req, res) => {  
    try {
      const adminRequesting = await getRequestingAdmin(req, res);
  
      const userFound = await User.findOne({username: req.params.username});
  
      return res.send({ success: true, message: "Valid token", adminRequesting: adminRequesting.username, userFound });
    } catch (err) {
      console.log(err);
      return res.send({ error: err.message, success: false });
    }
});

// UPDATE & DELETE --------------------------------------------------------------------------------------------------------------------------------

// Update user by id
router.patch('/:userId', async (req, res) => {
    const { password } = req.body;
    let user = new User();
    try {
        const adminRequesting = await getRequestingAdmin(req, res);

        const userUpdated = await User.updateOne( { _id: req.params.userId }, { password: user.generateHash(password) } );
        return res.send({ success: true, message: "User updated successfully", adminRequesting: adminRequesting.username, userUpdated })
    } catch(err) {
        console.log(err);
        return res.send({error: err.message});
    }
});

// Update user by username (with password)
router.patch('/userPW/:userUsername', async (req, res) => {
    const { password, name, firstname, email, tel } = req.body;
    let user = new User();
    try {
        const adminRequesting = await getRequestingAdmin(req, res);

        const userUpdated = await User.updateOne( { username: req.params.userUsername }, { password: user.generateHash(password), name, firstname, email, tel } );
        return res.send({ success: true, message: "User updated successfully", adminRequesting: adminRequesting.username, userUpdated })
    } catch(err) {
        console.log(err);
        return res.send({error: err.message});
    }
});

// Update user by username (without password)
router.patch('/userNPW/:userUsername', async (req, res) => {
    const { name, firstname, email, tel } = req.body;
    try {
        const adminRequesting = await getRequestingAdmin(req, res);

        const userUpdated = await User.updateOne( { username: req.params.userUsername }, { name, firstname, email, tel } );
        return res.send({ success: true, message: "User updated successfully", adminRequesting: adminRequesting.username, userUpdated })
    } catch(err) {
        console.log(err);
        return res.send({error: err.message});
    }
});

// Delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const adminRequesting = await getRequestingAdmin(req, res);
        
        const userDeleted = await User.findByIdAndDelete(req.params.userId);

        return res.send({success: true, adminRequesting: adminRequesting.username, userDeleted })
    } catch(err) {
        console.log(err);
        return res.send({error: err.message});
    }
});

// SIGN IN --------------------------------------------------------------------------------------------------------------------------

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    
    // if the fields are empty => error
    if (!username) return res.send({ success: false, message: "Error: Username cannot be blank."});
    if (!password) return res.send({ success: false, message: "Error: Password cannot be blank."});
  
    try {
      const user = await User.findOne({ username });  
      // Teste si le mot de passe vaut celui qui est hashé
      if (!user.validPassword(password)) return res.send({ success: false, message: "Error: Invalid password while testing" });
      // ajoute les valeurs assignées dans le token
      const token = jwt.sign({ username, name: user.name, firstname: user.firstname, auth: true }, "3NgAMe1R4Hco2xMZ8q9PnzT7v8fF2wL56");
      return res.send({ success: true, message: "Valid sign in", token });
    } catch (err) {
      console.log(err);
      return res.send({ success: false, message: "Error: Invalid." });
    }  
});  

module.exports = router;