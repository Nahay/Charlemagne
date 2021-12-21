import React from "react";
import { Redirect, Route } from "react-router-dom";
import { decodeToken } from "react-jwt";


function ProtectedLoginRoute({ component: Component, ...restOfProps }) {

  const decodedToken = decodeToken(localStorage.getItem("userToken"));
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !decodedToken ? <Component {...props} /> : <Redirect to="/"/>
      }
    />
  );
}

export default ProtectedLoginRoute;