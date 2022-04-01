import React from "react";
import { Route, useHistory } from "react-router-dom";

import { decodeToken } from "react-jwt";

import { getUserById } from "../../../services/usersService";


function ProtectedUserRoute({component: Component, ...restOfProps }) {

  const history = useHistory();

  const getUser = async () => {

    const token = localStorage.getItem("userToken");
    const decodedToken = decodeToken(token);

    const loc = history.location.pathname;

    // s'il y a un token
    if (decodedToken !== null) {
        const user = await getUserById(decodedToken._id);
        // connecté
        if (user.success) {
          // page login ou mdp déjà changé
          if (loc === "/connexion" || (!decodedToken.firstConnection && loc === '/changer-mdp')) history.push('/');
          return true;
        }
    }

    // pas connecté
    localStorage.removeItem('userToken');
    if (loc !== '/connexion') history.push('/');
    return false;
  }


  return (
    <Route
      {...restOfProps}
      render={(props) =>
        getUser() && <Component {...props} />
      }
    />
  );
}

export default ProtectedUserRoute;