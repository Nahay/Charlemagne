import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';



const getParam = async (type) => {
    try {
        const { data } = await axios.get(API_URL + "/params/" +type);
        return data.sentence;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateParam = async (type, mess) => {
    try {
            await axios.patch(
            API_URL + "/params/" +type, {
                sentence : mess
            }
            );

            if (type === "welcome") toast.success("Le message de bienvenue a été mis à jour !");
            else if (type === "order") toast.success("Les informations en bas de commande ont été mises à jour !");
        }

    catch(err) {
        toast.error(err.message);
    }
}


export {
    getParam,
    updateParam,
};