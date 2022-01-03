import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import DishCommandList from '../../components/admin/DishCommandList';

import OrderList from '../../components/order/OrderList';
import { getCommandByUser } from '../../services/commandsService';
import { getUserById } from '../../services/usersService';
import { getCommandListByCommand } from '../../services/commandsListService';

const History = () => {

    const [user, setUser] = useState({});
    const [orderList, setOrderList] = useState([]);
    const [dishList, setDishList] = useState([]);

    useEffect(() => {   

        async function getOrderList() {
            const userDecoded = decodeToken(localStorage.getItem("userToken"));

            if (userDecoded) {
                const currentUser = await getUserById(userDecoded._id);
                const orders = await getCommandByUser(currentUser.user._id);
                setOrderList(orders);
            }
        }

        async function getCurrentUser() {
            const userDecoded = decodeToken(localStorage.getItem("userToken"));

            if (userDecoded) {
                const currentUser = await getUserById(userDecoded._id);                
                if (currentUser.success) setUser(currentUser.user);                
            }
        }

        getCurrentUser();
        getOrderList();

    },[]);

    // HANDLE ------------------------------------------------------------

    const handleOrderClick = async (id) => {
        const commands = await getCommandListByCommand(id);
        setDishList(commands);
        console.log(commands);
    }

    return (
        <div className="history__container">
            <p>Voici l'historique de vos commandes.</p>
            <div className="history__content">

                <div className="content__left">
                    <OrderList orderListByUser={orderList} handleClick={handleOrderClick} />
                </div>
                <div className="content__right">
                    <DishCommandList dishList={dishList} />
                </div>
            </div>
        </div>
    );
}
 
export default History;