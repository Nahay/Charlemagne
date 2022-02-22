import React, { useEffect, useState } from "react";
import { getDishById } from '../../services/dishesService';

const DishCommandList = ({dishList, onClickDish}) => {
  
  const [dishesName, setDishesName] = useState([]);
  const [dishesDesc, setDishesDesc] = useState([]);

  useEffect(() => {
    async function getSetDishesName() {
      setDishesName([]);
      setDishesDesc([]);
        dishList.forEach(async (d) => {
          const dish = await getDishById(d.dishID);
          setDishesName(dishesName => [...dishesName, dish.name]);
          setDishesDesc(dishesDesc => [...dishesDesc, dish.description]);
        });
    }

    getSetDishesName();

  }, [dishList]);
  
  return (
    <div className="list__container">
    {dishList.map((d,i) => {
          return (
            <div className="list__container__box" key={d._id} onClick={() => onClickDish(d)}>

              <div className="dish__comment hidden">
                <p>{dishesName[i]}</p>
                <p>{dishesDesc[i]}</p>
              </div>
              
              <div className="infos-dish" >
                <p>{dishesName[i]}</p>
                <div className="dish__quantity">
                  <p>Quantité : {d.quantity}</p>
                </div>
              </div>
            </div>
          );
    })}
  </div>
   );
}

export default DishCommandList;