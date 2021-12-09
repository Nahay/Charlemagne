import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';

const config = (token) => {
    return { headers: {'x-access-token': token}};
}

// CREATE ---------------------------------------------------------------------------------------------------------------------------------------

const createAdmin = async (username, password, token) => {
    try {
        await axios.post(API_URL + "/admins", { username, password }, config(token));
    } catch(err) {
        toast.error(err.message);
    }
}

// GET ---------------------------------------------------------------------------------------------------------------------------------------

const getAdmins = async (token) => {
    try {
        const { data } = await axios.get(API_URL + "/admins", config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

const getAdminByUsername = async (username, token) => {
    try {
        const { data } = await axios.get(API_URL + "/admins/admin/" +username, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

const getAdminById = async (id, token) => {
    try {
        const { data } = await axios.get(API_URL + "/admins/" +id, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

// UPDATE & DELETE ---------------------------------------------------------------------------------------------------------------------------------------

const updateAdminById = async (id, password, token) => {
    try {
        await axios.patch(API_URL + "/admins/" +id, { password }, config(token));
    } catch(err) {
        toast.error(err.message);
    }
}

const updateAdminByUsername = async (username, password, token) => {
    try {
        await axios.patch(API_URL + "/admins/admin/" +username, { password }, config(token));
    } catch(err) {
        toast.error(err.message);
    }
}

const deleteAdmin = async (id, token) => {
    try {
        await axios.delete(API_URL + "/admins/" +id, config(token));
    } catch(err) {
        console.log(err);
        toast.error(err.message);
    }
}

// SIGN IN ---------------------------------------------------------------------------------------------------------------------------------------

const adminSignIn = async (username, password) => {
    try {
        const { data } = await axios.post(API_URL + "/admins/signin", { username, password });
        return data;
    } catch(err) {
        toast.error(err.message);
    }
}

export { createAdmin, updateAdminById, updateAdminByUsername, getAdminById, getAdminByUsername, adminSignIn, getAdmins, deleteAdmin };