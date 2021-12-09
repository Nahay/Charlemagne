import React from "react";
import { Redirect, Route } from "react-router-dom";
import { decodeToken } from "react-jwt";

function ProtectedLoginRoute({ component: Component, isAuthenticated, isAdmin, ...restOfProps }) {
  const decodedToken = decodeToken(isAuthenticated);

  const getAuthentication = () => {
    if (decodedToken) return decodedToken.auth;
    return false;
  }

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !getAuthentication() ? <Component {...props} /> : isAdmin ? <Redirect to="/admin/accueil"/> : <Redirect to="/"/>
      }
    />
  );
}

export default ProtectedLoginRoute;