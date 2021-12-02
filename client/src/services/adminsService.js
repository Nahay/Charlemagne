import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';

const createAdmin = async (username, password) => {
    try {
        await axios.post(API_URL + "/admins", {
            username,
            password
        });
    } catch(err) {
        toast.error(err.message);
    }
};

const getAdminByUsername = async (username) => {
    try {
        const { data } = await axios.get(API_URL + "/admins/username/" +username);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getAdminById = async (id) => {
    try {
        const { data } = await axios.get(API_URL + "/admins/" +id);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateAdmin = async (id, value) => {
    try {
        await axios.patch(API_URL + "/admins/" +id, { password: value });
    } catch(err) {
        toast.error(err.message);
    }
}

export { createAdmin, updateAdmin, getAdminById, getAdminByUsername };