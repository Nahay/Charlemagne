import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import { decodeToken } from 'react-jwt';

import TextArea from '../components/generic/TextArea';
import InputButton from '../components/generic/InputButton';
import OrderTable from "../components/order/OrderTable";

import { getDishByDate } from "../services/dishesService";
import { getParam } from '../services/paramsService';
import { getUserById } from '../services/usersService'; 
import { getDateByDate } from "../services/calendarService";


const PassCommand = () => {

    const { date } = useParams();

    const [time, setTime] = useState("");
    const [orderInfo, setOrderInfo] = useState("");
    const [comm, setComm] = useState("");    
    const [container, setContainer] = useState(false);    
    const [confirmEmail, setConfirmEmail] = useState(false);   
    const [total, setTotal] = useState("");   
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");


    const [dishList, setDishList] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {

      async function getDishList() {
        const dishes = await getDishByDate(date);
        setDishList(dishes);
      }

      async function getCurrentUser() {
        const userDecoded = decodeToken(localStorage.getItem("userToken"));
        const user = await getUserById(userDecoded._id);
        setFirstname(user.firstname);
        setName(user.name);
      }

      async function getTimeLimit() {
        const currentDate = await getDateByDate(date);
        setTime({min: currentDate.timeMin, max: currentDate.timeMax});
      }
      getTimeLimit();
      getDishList();
      getSetOrderInfo();
      getCurrentUser();
    }, [date]);


    useEffect(() => {

      function getData() {
      
          setData([]);

          if (dishList !== []) {
  
              dishList.forEach((d, i) => {
  
                  setData(data =>
                      [...data, {id:i, name: d.idDish.name, price: d.idDish.price, nb: d.numberRemaining, nbC:""}]
                  );
              });
          }
      }

      getData();

  }, [dishList]);


  useEffect(() => {

    const getTotal = () => {

      let nbTotal = 0;
  
      if (data !== []) data.forEach((d) => nbTotal += d.price*Number(d.nbC));
  
      setTotal(nbTotal);
      
    }
    
    getTotal();

  }, [data]);


  const getSetOrderInfo = async () => {
    const orderMess = await getParam("order");
    setOrderInfo(orderMess);
  }

  // HANDLE ------------------------------------------------

  const handleComm = (e) => { setComm(e.target.value) } 

  const handleContainerChange = () => { setContainer(container ? false : true) }

  const handleEmailChange = () => { setConfirmEmail(confirmEmail ? false : true) }


  return (
    <div className="make-order">
      <div className="make-order__container">
        <h1 className="container__date">{moment(new Date(parseInt(date))).locale('fr').format('LL')}</h1>
        <div className="container__name-time">
          <p className="fixed-text name">{name} {firstname}</p>
          <div className="time__container">
            <input type="time" min={time.min} max={time.max} required/>
          </div>
        </div>
        <OrderTable data={data} setData={setData}/>
        <div className="container__comm-others">
          <TextArea
              value={comm}
              placeholder="Commentaire..."
              required = {false}
              handleChange={handleComm}
          />
          <div className="comm-others__others">
            <p className="fixed-text">{total} €</p>
            <div>
              <input
                type="checkbox"
                id="container"
                name="container"
                checked={container}
                onChange={handleContainerChange}
              />
              <label htmlFor="container">J'amène mes propres contenants</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="confirm-email"
                name="confirm-email"
                checked={confirmEmail}
                onChange={handleEmailChange}
              />
              <label htmlFor="confirm-email">Recevoir un email de confirmation</label>
            </div>
          </div>
        </div>
        <div className="container__mess-btn">
          <p className="fixed-text order">{orderInfo}</p>
          <InputButton value= "Commander" type="submit"/>
        </div>
      </div>
    </div>
  );
};

export default PassCommand;