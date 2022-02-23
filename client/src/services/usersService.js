import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';


const config = (token) => {
    return { headers: {'x-access-token': token}};
}

// GET ---------------------------------------------------------------------------------------------------------------------------------------

const getUsers = async(token) => {
    try {
        const { data } = await axios.get(API_URL + "/users", config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

const getVisibleUsers = async(token) => {
    try {
        const { data } = await axios.get(API_URL + "/users/visible", config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

const getUserByUsername = async (username, token) => {
    try {
        const { data } = await axios.get(API_URL + "/users/user/" + username, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

const getUserById = async (id) => {
    try {
        const {data} = await axios.get(API_URL + "/users/" + id);
        return data;
    } catch (err) { 
        toast.error(err.message);
    }
}

// CREATE ---------------------------------------------------------------------------------------------------------------------------------------

const createUser = async (username, password, name, firstname, email, tel, token) => {
    try {
        await axios.post(API_URL + "/users", { username, password, name, firstname, email, tel }, config(token));
        toast.success("L'utilisateur a été crée !");
    } catch(err) {
        toast.error(err.message);
    }
}
// UPDATE -----------------------------------------------------------------------------------------------------------------------------------

const updateUser = async (id, password, name, firstname, email, tel, token) => {
    try {
        await axios.patch(API_URL + "/users/" +id, { password, name, firstname, email, tel }, config(token));
        toast.success("L'utilisateur a été mis à jour !");
    } catch(err) {
        toast.error(err.message);
    }
}

const updateUserNoPw = async (id, name, firstname, email, tel, token) => {
    try {
        await axios.patch(API_URL + "/users/usernpw/" +id, { name, firstname, email, tel }, config(token));
        toast.success("L'utilisateur a été mis à jour !");
    } catch(err) {
        toast.error(err.message);
    }
}

const hideUser = async (id, token) => {
    try {
        await axios.patch(API_URL + "/users/hide/" +id, {visible: false}, config(token));
        toast.success("L'utilisateur a été supprimé !");
    } catch(err) {
        console.log(err)
        toast.error(err.message);
    }
}

// DELETE ---------------------------------------------------------------------------------------------------------------------------------------

const deleteUser = async (id, token) => {
    try {
        await axios.delete(API_URL + "/users/" +id, config(token));
        toast.success("L'utilisateur a été supprimé !");
    } catch(err) {
        console.log(err);
        toast.error(err.message);
    }
}

const deleteUserByUsername = async (username, token) => {
    try {
        await axios.delete(API_URL + "/users/user/" +username, config(token));
        toast.success("L'utilisateur a été supprimé !");
    } catch(err) {
        console.log(err);
        toast.error(err.message);
    }
}

// SIGN IN ------------------------------------------------------------------------------------------------------------------------------------

const userSignIn = async (username, password) => {
    try {
        const { data } = await axios.post(API_URL + "/users/signin", { username: username, password: password });
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};


export {
    userSignIn,
    getUserByUsername,
    getUserById,
    getUsers,
    getVisibleUsers,
    createUser,
    hideUser,
    updateUser,
    updateUserNoPw,
    deleteUser,
    deleteUserByUsername
}