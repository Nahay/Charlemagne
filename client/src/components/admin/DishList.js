import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import {getDishById} from '../../services/dishesService';


const DishList = ({dishByDateList, onClickDish, onClickDelete}) => {

  const [dishesName, setDishesName] = useState([]);

  useEffect(() => {

    async function getSetDishesName() {
      setDishesName([]);
        dishByDateList.forEach(async d => {
        const dish = await getDishById(d.idDish);
        setDishesName(dishesName => [...dishesName, dish.name]);
        });
    }

    getSetDishesName();

  }, [dishByDateList]);
  

  return (
    <div className="list__container">
    {dishByDateList.map((d, i) => {
          return (
            <div className="list__container__box" key={d._id} >
              <div className="infos-dish" onClick={() => onClickDish(d._id, d.idDish, d.numberKitchen, d.numberRemaining)}>
                <p>{dishesName[i]}</p>
                <div className="nb-dish">
                  <span>Nb cuisine : {d.numberKitchen}</span>
                  <span>Nb restants : {d.numberRemaining}</span>
                </div>
              </div>
              <div className="icon-delete" onClick={() => onClickDelete(d._id, d.numberKitchen, d.numberRemaining)}>
                <FontAwesomeIcon icon={faTrashAlt} size="sm"/>
              </div>
            </div>
          );
    })}
  </div>
   );
}

export default DishList;