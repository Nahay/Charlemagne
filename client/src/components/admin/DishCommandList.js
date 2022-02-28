import React from "react";

const DishCommandList = ({ dishList, onClickDish }) => {
  
  return (
    <div className="list__container">
    {dishList.map((d) => {
          return (
            <div className="list__container__box" key={d._id} onClick={() => onClickDish(d)}>      
              <div className="infos-dish" >
                <p>{d.dishID.name}</p>
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