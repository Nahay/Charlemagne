import React from "react";
import moment from "moment";
import "moment/locale/fr";


const List = ({dateList, onDateChange, rightRef}) => {

  const executeScroll = () => {
    rightRef.current.scrollIntoView({ 
       behavior: "smooth",
       block: "nearest"
    })
  }

  const handleClick = (date) => {
    onDateChange(date);
    executeScroll();
  }

  return (
    <div className="list__container">
    {dateList.map((d) => {
      // conversion de la date de la bdd string en Date()
      const date = new Date(d.dateC).getTime();
      // déclaration de la date actuelle
      let todayMinusTwo = new Date();
      // transformation de la date en Jour - 2
      todayMinusTwo.setDate(todayMinusTwo.getDate() - 2);
      // déclare une nouvelle date sous le format int
      todayMinusTwo = todayMinusTwo.getTime();

      if (date >= todayMinusTwo) {
        return (
          <div className="list__container__box" key={d._id} onClick={() => handleClick(d.dateC)}>
            <p>{moment(date).locale("fr").format("LL")}</p>
            <span>nb plats dispo ?</span>
          </div>
        );
      }
      return null;
    })}
  </div>
   );
}

export default List;