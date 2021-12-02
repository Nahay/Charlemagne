import React from "react";
import Calendar from "react-calendar";
import moment from "moment";
import 'moment/locale/fr';


const AdminCalendar = ({dateList, rightRef, onChangeDate}) => {

    const executeScroll = () => {
        rightRef.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "nearest"
        })
    }

    const onChange = (e) => {
        const date = moment(e).locale('fr').format('LL');
        onChangeDate(date);
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
            onClickDay={executeScroll}
        />
     );
}

export default AdminCalendar;