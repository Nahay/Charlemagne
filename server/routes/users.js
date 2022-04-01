const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/Command');
const { getRequestingAdmin, getRequestingUser } = require('./auth');


// CREATE ------------------------------------------------------------------------------------------------------------------------------

// User
router.post('/', async (req, res) => {
    const {username, password, name, firstname, email, tel} = req.body;
    try {
        await getRequestingAdmin(req, res);

        const newUser = new User({username, password, name, firstname, email, tel});
        newUser.password = newUser.generateHash(password);

        const user = await newUser.save();

        res.json({ success: true, message: "Signed up.", savedUser: { user } });
    } catch(err) {
        res.json({ err, success: false});
    }
});

// GET ---------------------------------------------------------------------------------------------------------------------------------------

// All users
router.get("/", async (req, res) => {
    try {
        await getRequestingAdmin(req, res);

      const users = await User.find();
      res.json({ success: true, users: users });
    } catch (err) {
        console.log(`${err}`);
      res.json({ err });
    }
});

// All visible users
router.get("/visible", async (req, res) => {
    try {
      await getRequestingAdmin(req, res);

      const users = await User.find({visible: true});
      res.json({ success: true, users: users });
    } catch (err) {
        console.log(`${err}`);
      res.json({ err });
    }
});

// User by id
router.get('/:userId', async (req, res) => {
    try {
        // pas de token car demandé dans des fichiers clients de la partie utilisateur
        // où ils n'auront pas de token admin
        // ! peut être utilsée dans postman sans token du coup
        const user = await User.findById(req.params.userId);
        
        if (user) return res.json({success: true, user});
        return res.json({success: false, message: "No User was founded"});
    } catch(err) {
        res.json({ err, success: false });
    }
});

// User by username
router.get("/user/:username", async (req, res) => {
    try {
      await getRequestingAdmin(req, res);

      const userFound = await User.findOne({username: req.params.username});
  
      if (userFound) return res.json({ success: true, message: "Valid token", userFound });
      return res.json({success: false, message: "No User was founded"});

    } catch (err) {
      console.log(`${err}`);
      res.json({ err, success: false });
    }
});

// Firstname by username
router.get("/firstname/:username", async (req, res) => {
    try {

      const userFound = await User.findOne({username: req.params.username});
  
      if (userFound) return res.json({ success: true, message: "Valid token", userFound: { "firstname": userFound.firstname } });
      return res.json({success: false, message: "No User was founded"});

    } catch (err) {
      console.log(`${err}`);
      res.json({ err, success: false });
    }
});

// UPDATE & DELETE --------------------------------------------------------------------------------------------------------------------------------

// Update firstConnection & password user by id
router.patch('/first', async (req, res) => {
    const { id, username, name, firstname, email, password } = req.body;
    let user = new User();
    try {
        await getRequestingUser(req, res);

        await User.updateOne( { _id: id }, { firstConnection : false, password: user.generateHash(password) } );

        const token = jwt.sign({ _id: id,  username, name, firstname, email, firstConnection : false }, process.env.JWT_TOKEN);

        res.json({ success: true, token });
    } catch(err) {
        res.json({err});
    }
});

// Update user by id
router.patch('/:userId', async (req, res) => {
    const { password, name, firstname, email, tel } = req.body;
    let user = new User();
    try {
        await getRequestingAdmin(req, res);

        const userUpdated = await User.updateOne( { _id: req.params.userId }, { password: user.generateHash(password), name, firstname, email, tel } );
        res.json({ success: true, message: "User updated successfully", userUpdated })
    } catch(err) {
        console.log(`${err}`);
        res.json({err});
    }
});

// Update user by id (without password)
router.patch('/usernpw/:id', async (req, res) => {
    const { name, firstname, email, tel } = req.body;
    try {
        await getRequestingAdmin(req, res);

        const userUpdated = await User.updateOne( { _id: req.params.id }, { name, firstname, email, tel } );
        res.json({ success: true, message: "User updated successfully", userUpdated })
    } catch(err) {
        console.log(`${err}`);
        res.json({err});
    }
});

// Hide a user (delete)
router.patch('/hide/:id', async (req, res) => {
    try {
        await getRequestingAdmin(req, res);

        const userDeleted = await User.updateOne( { _id: req.params.id }, {visible: false} );
        res.json({ success: true, userDeleted });
    } catch(err) {
        console.log(`${err}`);
        res.json({err});
    }
});

// Delete a user
router.delete('/:userId', async (req, res) => {
    try {
        await getRequestingAdmin(req, res);
        
        const userDeleted = await User.findByIdAndDelete(req.params.userId);

        res.json({success: true, userDeleted })
    } catch(err) {
        console.log(`${err}`);
        res.json({err});
    }
});

// Delete a user by username
router.delete('/user/:userUsername', async (req, res) => {
    try {
        await getRequestingAdmin(req, res);
        
        const userDeleted = await User.findOneAndDelete({username: req.params.userUsername});

        res.json({success: true, userDeleted })
    } catch(err) {
        console.log(`${err}`);
        res.json({err});
    }
});

// SIGN IN --------------------------------------------------------------------------------------------------------------------------

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    
    // if the fields are empty => error
    if (!username) return res.json({ success: false, message: "Error: Username cannot be blank."});
    if (!password) return res.json({ success: false, message: "Error: Password cannot be blank."});
  
    try {
      const user = await User.findOne({ username: username, visible: true });
      // Teste si le mot de passe vaut celui qui est hashé
      if (!user.validPassword(password)) return res.json({ success: false, message: "Error: Invalid password while testing" });
      // ajoute les valeurs assignées dans le token
      const token = jwt.sign({ _id: user._id,  username, name: user.name, firstname: user.firstname, email: user.email, firstConnection : user.firstConnection }, process.env.JWT_TOKEN);
      res.json({ success: true, message: "Valid sign in", token });
    } catch (err) {
      console.log(`${err}`);
      res.json({ err, success: false });
    }
});  

module.exports = router;