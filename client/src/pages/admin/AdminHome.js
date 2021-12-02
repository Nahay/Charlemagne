import React, {useState, useEffect} from 'react';
import InputButton from '../../components/generic/InputButton';
import TextArea from '../../components/generic/TextArea';

import {getMess, getOrderInfo, updateMess, updateOrderInfo} from '../../services/paramsService';


const AdminHome = () => {

    const [welcomeMess, setWelcomeMess] = useState("");
    const [orderInfo, setOrderInfo] = useState("");

    
    useEffect(() => {
        getSetMess();
        getSetOrderInfo();
    }, []);
    
    const getSetMess = async () => {
        const mess = await getMess();
        setWelcomeMess(mess);
    }

    const getSetOrderInfo = async () => {
        const orderMess = await getOrderInfo();
        setOrderInfo(orderMess);
    }


    // HANDLE ---------------------------------------------------------------

    const handleWelcomeMessage = (e) => {
        setWelcomeMess(e.target.value);
    }

    const handleOrderInfo = (e) => {
        setOrderInfo(e.target.value);
    }


    // DB -------------------------------------------------------------------

    const onWelcomeMessageSubmit = (e) => {
        e.preventDefault();
        updateMess(welcomeMess);
    }

    const onOrderInfoSubmit = (e) => {
        e.preventDefault();
        updateOrderInfo(orderInfo);
    }


    return (
        <div className="admin-home">
            <div className="admin-home__left">
                
            </div>
            
            <div className="admin-home__right">
                <div className="right__inputs">
                    <form className="right__inputs__1" onSubmit={onWelcomeMessageSubmit}>
                            <p>Changer la phrase de bienvenue :</p>
                            <TextArea
                                value={welcomeMess}
                                placeholder=""
                                id="welcome-message"
                                required = {false}
                                handleChange={handleWelcomeMessage}
                            />
                            <InputButton value="Changer"/>
                        </form>
                    <form className="right__inputs__2" onSubmit={onOrderInfoSubmit}>
                            <p>Changer les informations en bas de commande :</p>
                            <TextArea
                                value={orderInfo}
                                placeholder=""
                                id="order_info"
                                required = {false}
                                handleChange={handleOrderInfo}
                            />
                            <InputButton value="Changer"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;