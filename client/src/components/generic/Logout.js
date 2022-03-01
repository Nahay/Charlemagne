import React from "react";

import { decodeToken } from "react-jwt";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Logout = ({ handleLogout, handleLogin, isAuthenticated }) => { 

    const decodedToken = decodeToken(isAuthenticated);

    return (
        <div className="btn__logout" onClick={decodedToken ? handleLogout : handleLogin}>

            { decodedToken ?
                <p>
                    <FontAwesomeIcon icon={faUser} size="" />
                    Se déconnecter
                </p>
            :
                <p>
                    <FontAwesomeIcon icon={faUser} size="" />
                    Se connecter
                </p>
            }            

        </div>
    );
};

export default Logout;