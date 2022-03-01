import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faList } from "@fortawesome/free-solid-svg-icons";

import ACalendar from "../components/order/ACalendar";
import List from "../components/order/List";
import DayDetails from "../components/order/DayDetails";

import { getDateByDate, getDatesByVisibility } from '../services/calendarService';
import { getDishByDate } from '../services/dishesService';


const Order = () => {

  const ref = useRef(null);

  const [dateList, setDatesList] = useState([]);
  const [dishByDateList, setDishByDateList] = useState([]);
  const [tableActive, setTableActive] = useState(true);
  const [date, setDate] = useState(new Date(new Date().toDateString()).getTime());

  useEffect(() => {

    async function getSetDates() {
      const dates = await getDatesByVisibility();
      setDatesList(dates);

      
      await getDishByDateList(date);
    }

    getSetDates();
  }, [date]);

  const getDishByDateList = async (dateC) => {
    let dateVisible = false;
    const dishes = await getDishByDate(dateC);

    const d = await getDateByDate(dateC);

    if (d !== null) {
      if(d.visibility) dateVisible = true;
    }

    if (dishes === null || !dateVisible) {
      setDishByDateList([]);
    }
    else setDishByDateList(dishes);
  }

  const onDateChange = async (dateC) => {

    setDate(dateC);

    await getDishByDateList(dateC);

  }

  return (
    <div className="order">
      <div className="order__left">
        <div className="order__left__content">
          <div className="order__left__content__icons">
            <FontAwesomeIcon
              icon={faTable}
              onClick={() => setTableActive(true)}
            />
            <FontAwesomeIcon
              icon={faList}
              onClick={() => setTableActive(false)}
            />
          </div>

          { tableActive ?
            <ACalendar rightRef={ref} dateList={dateList} onDateChange={onDateChange} />
          : 
            <List rightRef={ref} dateList={dateList} onDateChange={onDateChange} />
          }

        </div>
      </div>
      <div className="order__right" ref={ref}>
          <DayDetails date={date} dishByDateList = {dishByDateList} />
      </div>
    </div>
  );
};

export default Order;