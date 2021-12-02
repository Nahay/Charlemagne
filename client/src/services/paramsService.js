import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../app-config';



const getMess = async () => {
    try {
        const { data } = await axios.get(API_URL + "/params/61a683aa114c5ac9ed7538be");
        return data.sentence;
    } catch(err) {
        toast.error(err.message);
    }
};

const getOrderInfo = async () => {
    try {
        const { data } = await axios.get(API_URL + "/params/61a683b8114c5ac9ed7538c0");
        return data.sentence;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateMess = async (mess) => {
    try {
            await axios.patch(
            API_URL + "/params/61a683aa114c5ac9ed7538be", {
                sentence : mess
            }
            );
            toast.success("Le message de bienvenue a été mis à jour !");
        }

    catch(err) {
        toast.error(err.message);
    }
}

const updateOrderInfo = async (mess) => {
    try {
            await axios.patch(
            API_URL + "/params/61a683b8114c5ac9ed7538c0", {
                sentence : mess
            }
            );
            toast.success("Les informations en bas de commande ont été mises à jour !");
        }

    catch(err) {
        toast.error(err.message);
    }
}


export {
    getOrderInfo,
    updateOrderInfo,
    updateMess,
    getMess,
};