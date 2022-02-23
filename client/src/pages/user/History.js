import React, { useEffect, useState } from 'react';

import { decodeToken } from 'react-jwt';

import DishCommandList from '../../components/admin/DishCommandList';
import OrderList from '../../components/order/OrderList';

import { getCommandByUser } from '../../services/commandsService';
import { getUserById } from '../../services/usersService';
import { getCommandListByCommand } from '../../services/commandsListService';


const History = () => {

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

        getOrderList();

    },[]);

    const onClickDish = () => {
        
    }

    // HANDLE ------------------------------------------------------------

    const handleOrderClick = async (id) => {
        const commands = await getCommandListByCommand(id);
        setDishList(commands);
    }

    return (
        <div className="history__container">            
            <div className="history__content">

                <p>Historique de vos commandes :</p>

                <div className="content__list">
                    <div className="content__left">
                        <OrderList orderListByUser={orderList} handleClick={handleOrderClick} />
                    </div>
                    <div className="content__right">
                        <DishCommandList dishList={dishList} onClickDish={onClickDish}/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
export default History;