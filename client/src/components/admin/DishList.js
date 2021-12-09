import React, {useEffect, useState} from "react";

import {getDishById} from '../../services/dishesService';


const DishList = ({dishByDateList}) => {

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
            <div className="list__container__box" key={d._id}>
              <p>{dishesName[i]}</p>
              <div className="nb-dish">
                <span>Nb cuisine : {d.numberKitchen}</span>
                <span>Nb restants : {d.numberRemaining}</span>
              </div>
            </div>
          );
    })}
  </div>
   );
}

export default DishList;