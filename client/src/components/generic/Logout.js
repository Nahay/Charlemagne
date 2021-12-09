import React from "react";
import { decodeToken } from "react-jwt";

const Logout = ({handleLogout, handleLogin, isAuthenticated}) => { 

    const decodedToken = decodeToken(isAuthenticated);
    const getAuthentication = () => {
        if(decodedToken) return decodedToken.auth;
        return false;
    }

    return (
        <div className="btn__logout" onClick={isAuthenticated ? handleLogout : handleLogin}>
            { getAuthentication() ? <p >Se déconnecter</p> : <p >Se connecter</p> }            
        </div>
    );
};

export default Logout;