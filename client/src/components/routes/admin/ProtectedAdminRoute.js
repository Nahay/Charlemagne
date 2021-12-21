import React from "react";
import { Redirect, Route } from "react-router-dom";
import { decodeToken } from "react-jwt";


function ProtectedAdminRoute({ component: Component, ...restOfProps }) {

  const decodedToken = decodeToken(localStorage.getItem("adminToken"));
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        decodedToken ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
}

export default ProtectedAdminRoute;