import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';


const createDate = async (dateC, visibility, comment, timeMin, timeMax) => {
    try {
        await axios.post(API_URL + "/calendar", {
            dateC,
            visibility,
            comment, 
            timeMin,
            timeMax
        });
        toast.success("La date a été créée !");

    } catch(err) {
        toast.error(err.message);
    }
};

const getDates = async () => {
    try {
        const { data } = await axios.get(API_URL + "/calendar");
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getDateByDate = async (date) => {
    try {
        const { data } = await axios.get(API_URL + "/calendar/date/" +date);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getDatesByVisibility = async () => {
    try {
        const { data } = await axios.get(API_URL + "/calendar/visibility");
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getDateById = async (id) => {
    try {
        const { data } = await axios.get(API_URL + "/calendar/" +id);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateDate = async (date, visibility, comment, timeMin, timeMax) => {
    try {
        await axios.patch(
            API_URL + "/calendar/" +date, {
                visibility : visibility,
                comment : comment,
                timeMin: timeMin,
                timeMax: timeMax
            }
        );
        toast.success("La date a été mise à jour !");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteDate = async (date) => {
    try {
        await axios.delete(API_URL + "/calendar/" +date);
        toast.success("Cette date a été supprimée !");
    } catch(err) {
        toast.error(err.message);
    }
};


export {
    createDate,
    getDates,
    getDateByDate,
    getDateById,
    getDatesByVisibility,
    updateDate,
    deleteDate
};