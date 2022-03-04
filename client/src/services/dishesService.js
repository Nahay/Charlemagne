import axios from 'axios';
import { toast } from 'react-toastify';
 
const API_URL = process.env.REACT_APP_API_URL;


// DISHES

const createDish = async (name, price, description, type) => {
    try {
        const { data } = await axios.post(API_URL + "/dishes", {
            name,
            price,
            description,
            type
        });
        toast.success(`Le plat ${data.name} a été créé !`);

    } catch(err) {
        toast.error(err.message);
    }
};

const getDishes = async () => {
    try {
        const { data } = await axios.get(API_URL + "/dishes/visible");
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getInvisibleDishes = async () => {
    try {
        const { data } = await axios.get(API_URL + "/dishes/invisible");
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
        const { data } = await axios.patch(
        API_URL + "/dishes/" +id, {
            name: name,
            price : price,
            description : desc,
            type: type,
        }
        );
        if (data.modifiedCount > 0) toast.success(`Le plat a été mis à jour !`);
    }
    catch(err) {
        toast.error(err.message);
    }
}

const deleteDish = async (id) => {
    try {
        const { data } = await axios.delete(API_URL + "/dishes/" +id);
        toast.success(`Le plat ${data.name} a été supprimé !`);
        return data.type;
    }
    catch(err) {
        toast.error(err.message);
    }
}

const hideDish = async (id) => {
    try {
        const { data } = await axios.patch(API_URL + "/dishes/hide/" +id);
        toast.success(`Le plat ${data.name} n'est plus visible !`);
        return data.type;
    }
    catch(err) {
        toast.error(err.message);
    }
}

const unhideDish = async (id) => {
    try {
        const { data } = await axios.patch(API_URL + "/dishes/unhide/" +id);
        toast.success(`Le plat ${data.name} est à nouveau visible !`);
        return data.type;
    }
    catch(err) {
        toast.error(err.message);
    }
}

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

const getDishByDate = async (date) => {
    try {
        const { data } = await axios.get(API_URL + "/dish-date/date/" +date);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getNbRByDate = async (date) => {
    try {
        const { data } = await axios.get(API_URL + "/dish-date/date/" +date);
        let nb = 0;
        data.forEach(d => {
            nb+=d.numberRemaining;
        });
        return nb;
    } catch(err) {
        toast.error(err.message);
    }
};

const getDatesAndNb = async () => {
    try {
        const { data } = await axios.get(API_URL + "/dish-date/date/");
        let nbDish = [];

        data.forEach(d => {
            if(nbDish.length === 0) nbDish.push({dateC: d.dateC, nbR: d.numberRemaining});
            else {
                let isHere = false;
                nbDish.forEach(n => {
                    if(n.dateC === d.dateC) {
                        isHere = true;
                        n.nbR += d.numberRemaining;
                    }
                });
                !isHere && nbDish.push({dateC: d.dateC, nbR: d.numberRemaining});
            }
        });
        return nbDish;
    } catch(err) {
        toast.error(err.message);
    }
};


const getDishByDateAndDish = async (dateC, idDish) => {
    try {
        const { data } = await axios.get(API_URL + "/dish-date/dateDish/" +dateC+"/"+idDish);
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
        } catch(err) {
        toast.error(err.message);
    }
};

const updateDishDateQtt = async (dateC, idDish, numberRemaining) => {
    try {
        await axios.patch(
            API_URL + "/dish-date/qtt", {
                dateC : dateC,
                idDish: idDish,
                numberRemaining : numberRemaining
            }
        );
        } catch(err) {
        toast.error(err.message);
    }
};

const deleteDishDate = async (id) => {
    try {
        await axios.delete(API_URL + "/dish-date/id/" +id);
        toast.success("Le plat a été supprimé de cette date !");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteAllDishesDate = async (dateC) => {
    try {
        const { data } = await axios.delete(API_URL + "/dish-date/date/"+dateC);
        if (data.deletedCount !== 0) toast.success("Tous les plats de cette date ont été supprimés !");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteAllDishesDish = async (idDish) => {
    try {
        const { data } = await axios.delete(API_URL + "/dish-date/dish/"+idDish);
        if (data.deletedCount !== 0) toast.success("Tous les plats ont été supprimés des dates !");
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
    getDatesAndNb,
    getDishByDateAndDish,
    deleteDish,
    hideDish,
    createDishDate,
    deleteAllDishesDate,
    getDishByDate,
    updateDishDate,
    deleteDishDate,
    deleteAllDishesDish,
    getNbRByDate,
    getInvisibleDishes,
    unhideDish,
    updateDishDateQtt
};