import React from "react";


const DishList = ({dishByDateList}) => {

  return (
    <div className="list__container">
    {dishByDateList.map((d) => {
          return (
            <div className="list__container__box" key={d._id}>
              <p>{d.name}</p>
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