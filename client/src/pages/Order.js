import React, { useState, useEffect, useRef } from "react";
import ACalendar from "../components/order/ACalendar";
import List from "../components/order/List";
import DayDetails from "../components/order/DayDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faList } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import 'moment/locale/fr';


const Order= () => {

  const ref = useRef(null);

  const [dateList, setDatesList] = useState([]);
  const [tableActive, setTableActive] = useState(true);
  const [date, setDate] = useState(moment(new Date()).locale('fr').format('LL'));

  useEffect(() => {
  }, []);

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
          <ACalendar rightRef={ref} dateList={dateList} setDate={setDate} />
          : <List rightRef={ref} dateList={dateList} setDate={setDate} /> }

        </div>
      </div>
      <div className="order__right" ref={ref}>
          <DayDetails date = {date}/>
      </div>
    </div>
  );
};

export default Order;