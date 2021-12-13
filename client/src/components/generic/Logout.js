import React from "react";
import { decodeToken } from "react-jwt";


const Logout = ({handleLogout, handleLogin, isAuthenticated}) => { 

    const decodedToken = decodeToken(isAuthenticated);

    return (
        <div className="btn__logout" onClick={decodedToken ? handleLogout : handleLogin}>
            { decodedToken ? <p>Se déconnecter</p> : <p>Se connecter</p> }            
        </div>
    );
};

export default Logout;