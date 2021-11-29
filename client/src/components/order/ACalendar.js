import React from "react";
import Calendar from "react-calendar";
import moment from "moment";
import 'moment/locale/fr';


const ACalendar = ({dateList, setDate, rightRef}) => {

    const executeScroll = () => {
        rightRef.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "nearest"
        })
    }

    const onChange = (e) => {
        setDate(moment(e).locale('fr').format('LL'));
    };
    
    const tileClassName = ({ date }) => {
        // pour toutes les dates affichées dans le mois actuel
        if (dateList.find((x) => x.date === moment(date).format("YYYY-MM-DD"))) {
          return "highlight";
        }
    };

    return ( 
        <Calendar
        onChange={onChange}
        tileClassName={tileClassName}
        onClickDay={executeScroll}/>
     );
}

export default ACalendar;