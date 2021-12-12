import React from "react";

const DishCommandList = ({dishByUser}) => {

  return (
    <div className="list__container">
    {dishByUser.map((d) => {
          return (
            <div className="list__container__box" key={d._id} >
              <div className="infos-dish">
                <p>{d.name}</p>
                <div className="nb-dish">
                  <span>Quantité : {d.quantity}</span>
                </div>
              </div>
            </div>
          );
    })}
  </div>
   );
}

export default DishCommandList;