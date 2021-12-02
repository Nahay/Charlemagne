import React from "react";


const DishList = () => {

    const dishList = [
        {
            name:'plat 1',
            nbRestant: 2
        },
        {
            name:'plat 2',
            nbRestant: 2
        },
        {
            name:'plat 3',
            nbRestant: 2
        },
        {
          name:'plat 4',
          nbRestant: 2
        },
        {
          name:'plat 5',
          nbRestant: 2
        },
        {
          name:'plat 5',
          nbRestant: 2
        },
        {
          name:'plat 5',
          nbRestant: 2
        }
    ]

  return (
    <div className="list__container">
    {dishList.map((d) => {
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