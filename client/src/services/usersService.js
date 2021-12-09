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

const getUserByUsername = async (username, token) => {
    try {
        const { data } = await axios.get(API_URL + "/users/user/" + username, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

const getUserById = async (id, token) => {
    try {
        const {data} = await axios.get(API_URL + "/users/" + id, config(token));
        return data;
    } catch (err) { 
        toast.error(err.message);
    }
}

// CREATE ---------------------------------------------------------------------------------------------------------------------------------------

const createUser = async (username, password, name, firstname, email, tel, token) => {
    try {
        await axios.post(API_URL + "/users", { username, password, name, firstname, email, tel }, config(token));
    } catch(err) {
        toast.error(err.message);
    }
}

// UPDATE -----------------------------------------------------------------------------------------------------------------------------------

const updateUserById = async (id, username, password, name, firstname, email, tel, token) => {
    try {
        await axios.patch(API_URL + "/users/" +id, { username, password, name, firstname, email, tel }, config(token));
    } catch(err) {
        toast.error(err.message);
    }
}

const updateUserWithPwByUsername = async (username, password, name, firstname, email, tel, token) => {
    try {
        await axios.patch(API_URL + "/users/userPW/" +username, { username, password, name, firstname, email, tel }, config(token));
    } catch(err) {
        toast.error(err.message);
    }
}

const updateUserWithoutPwByUsername = async (username, name, firstname, email, tel, token) => {
    try {
        await axios.patch(API_URL + "/users/userNPW/" +username, { username, name, firstname, email, tel }, config(token));
    } catch(err) {
        toast.error(err.message);
    }
}

// DELETE ---------------------------------------------------------------------------------------------------------------------------------------

const deleteUser = async (id, token) => {
    try {
        await axios.delete(API_URL + "/users/" +id, config(token));
    } catch(err) {
        console.log(err);
        toast.error(err.message);
    }
}


// SIGN IN ------------------------------------------------------------------------------------------------------------------------------------

const userSignIn = async (username, password) => {
    try {
        const { data } = await axios.post(API_URL + "/users/signin", { username, password });
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

export { userSignIn, getUserByUsername, getUserById, getUsers, createUser, updateUserById, updateUserWithPwByUsername, updateUserWithoutPwByUsername, deleteUser }