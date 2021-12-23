import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';


const createCommandList = async (command, dishID, quantity) => {
    try {
        await axios.post(API_URL + "/commandsList", {
            command,
            dishID,
            quantity
        });
        toast.success("L'élément de la commande a été créé !");
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandsList = async () => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList");
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandListByCommand = async (commandID) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/command/" +commandID);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getOneCommandListByDish = async (dishID) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/dish/" +dishID);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getOneCommandListByDate = async (date) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/date/" +date);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateQuantity = async (id, quantity) => {
    try {
        await axios.patch(
            API_URL + "/commandsList/" +id, {
                quantity
            }
        );
        toast.success("La quantité a été mise à jour !");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteCommandList = async (id) => {
    try {
        await axios.delete(API_URL + "/commandsList/" +id);
        toast.success("L'élement a été supprimé de la commande.");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteCommandListByCommand = async (commandID) => {
    try {
        await axios.delete(API_URL + "/commandsList/command/" +commandID);
        toast.success("L'élement a été supprimé de la commande.");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteAllCommandsList = async (commandID) => {
    try {
        await axios.delete(API_URL + "/commandsList/commands/" +commandID);
        toast.success("Les éléments ont été supprimés de la commande.");
    } catch(err) {
        toast.error(err.message);
    }
};

export {
    createCommandList,
    getCommandsList,
    getCommandListByCommand,
    getOneCommandListByDish,
    updateQuantity,
    deleteCommandList,
    deleteAllCommandsList,
    deleteCommandListByCommand,
    getOneCommandListByDate
};