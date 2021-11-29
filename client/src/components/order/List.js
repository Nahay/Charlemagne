import React from "react";
import moment from "moment";
import "moment/locale/fr";


const List = ({dateList, setDate, rightRef}) => {

  const executeScroll = () => {
    rightRef.current.scrollIntoView({ 
       behavior: "smooth",
       block: "nearest"
    })
  }

  const handleClick = (date) => {
    setDate(moment(date).locale('fr').format('LL'));
    executeScroll();
  }

  return (
    <div className="list__container">
    {dateList.map((d) => {
      // conversion de la date de la bdd string en Date()
      const date = new Date(d.date);
      // déclaration de la date actuelle
      let todayMinusTwo = new Date();
      // transformation de la date en Jour - 2
      todayMinusTwo.setDate(todayMinusTwo.getDate() - 2);
      // déclare une nouvelle date sous le format Date(YYYY, MM, DD)
      todayMinusTwo = new Date(
        moment(todayMinusTwo).format("YYYY, MM, DD")
      );

      if (date.getTime() >= todayMinusTwo.getTime()) {
        if (d.nbDish > 0)
          return (
            <div className="list__container__box" key={d.date} onClick={() => handleClick(d.date)}>
              <p>{moment(date).locale("fr").format("LL")}</p>
              <span>nb plats dispo : {d.nbDish}</span>
            </div>
          );
        else
          return (
            <div className="list__container__box--disabled" key={d.date}>
              <p>{moment(date).locale("fr").format("LL")}</p>
              <span>nb plats dispo : {d.nbDish}</span>
            </div>
          );
      }
      return null;
    })}
  </div>
   );
}

export default List;