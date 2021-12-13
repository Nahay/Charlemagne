import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const AllDishesList = ({dishList, onClickDish, onClickDelete}) => {

  return (
    <div className="list__container">
    {dishList.map((d) => {
          return (
            <div className="list__container__box" key={d.name}>
              <p onClick={() => onClickDish(d)}>
                {d.name}
              </p>
              <div
                className="icon-delete"
                onClick={() => onClickDelete(d._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="sm"/>
              </div>
            </div>
          );
    })}
  </div>
   );
}

export default AllDishesList;