import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';


// DISHES

const createDish = async (name, price, description, type) => {
    try {
        await axios.post(API_URL + "/dishes", {
            name,
            price,
            description,
            type
        });
        toast.success("Le plat a été créé !");

    } catch(err) {
        toast.error(err.message);
    }
};

const getDishes = async () => {
    try {
        const { data } = await axios.get(API_URL + "/dishes");
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getDishByName = async (name) => {
    try {
        const { data } = await axios.get(API_URL + "/dishes/name/" +name);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getDishById = async (id) => {
    try {
        const { data } = await axios.get(API_URL + "/dishes/" +id);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCountByName = async (name) => {
    try {
        const { data } = await axios.get(API_URL + "/dishes/findname/" +name);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateDish = async (id, name, price, desc, type) => {
    try {
            await axios.patch(
            API_URL + "/dishes/" +id, {
                name: name,
                price : price,
                description : desc,
                type: type,
            }
            );
            toast.success("Le plat a été mis à jour !");
        }

    catch(err) {
        toast.error(err.message);
    }
}

const deleteDish = async (id) => {
    try {
        await axios.delete(API_URL + "/dishes/" +id);
        toast.success("Le plat a été supprimé !");
    } catch(err) {
        toast.error(err.message);
    }
};

// DISH DATE

const createDishDate = async (dateC, idDish, numberKitchen) => {
    try {
        await axios.post(API_URL + "/dish-date", {
            dateC,
            idDish,
            numberKitchen
        });
        toast.success("Le plat a été créé pour cette date !");
    } catch(err) {
        toast.error(err.message);
    }
};

const getCountByDateAndId = async (dateC, idDish) => {
    try {
        const { data } = await axios.get(API_URL + "/dish-date/findDateName", {
            dateC,
            idDish
        });
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateDishDate = async (id, numberKitchen, numberRemaining) => {
    try {
        await axios.patch(
            API_URL + "/dish-date/" +id, {
                numberKitchen : numberKitchen,
                numberRemaining : numberRemaining
            }
        );
        toast.success("Les quantitées ont été mises à jour !");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteDishDate = async (id) => {
    try {
        await axios.delete(API_URL + "/dish-date/" +id);
        toast.success("Le plat a été supprimé de cette date !");
    } catch(err) {
        toast.error(err.message);
    }
};

export {
    createDish,
    updateDish,
    getDishById,
    getDishByName,
    getCountByName,
    getDishes,
    deleteDish,
    getCountByDateAndId,

    createDishDate,
    updateDishDate,
    deleteDishDate
};