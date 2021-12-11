import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const AccountList = ({watchClients, accountList, onClickClientAccount, onClickAdminAccount, onClickDelete}) => {

  return (
    <div className="list__container">
    {accountList.map((a) => {
          return (
            <div className="list__container__box" key={a._id}>
              <p onClick={() => {
                  if (watchClients) onClickClientAccount(a.email, a.username, a.name, a.firstname, a.tel)
                  else onClickAdminAccount(a.username)}
                }
              >
                {a.username}
              </p>
              <div
                className="icon-delete"
                onClick={() => onClickDelete(a.username)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="sm"/>
              </div>
            </div>
          );
    })}
  </div>
   );
}

export default AccountList;