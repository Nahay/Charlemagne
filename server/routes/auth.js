const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { User } = require('../models/Command');


const getRequestingAdmin = async(req, res) => {    
    try {
        // récupère le token du header de la requête 
        const token = req.headers["x-access-token"];
        // vérifie l'admin qui fait la requête est bien la seule et unique personne la faisant
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const adminId = decoded._id;
        const adminRequesting = await Admin.findById({ _id: adminId });

        if(!adminRequesting) throw { name: "AuthTokenError", message: "couldn't auth with this token" };

    } catch(err) {
        console.log(`${err}`);
        throw err;
    }
}

const getRequestingUser = async(req, res) => {    
    try {
        // récupère le token du header de la requête 
        const token = req.headers["user-access-token"];

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        
        const userId = decoded._id;
        const userRequesting = await User.findById({ _id: userId });

        if(!userRequesting) throw { name: "AuthTokenError", message: "couldn't auth with this token" };

    } catch(err) {
        console.log(`${err}`);
        throw err;
    }
}


exports.getRequestingAdmin = getRequestingAdmin;
exports.getRequestingUser = getRequestingUser;