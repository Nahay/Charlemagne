import React from 'react';
import { NavLink } from 'react-router-dom';
import { decodeToken } from 'react-jwt';


const HeaderBody = ({toggle}) => {

    const isLogged = () => { 
        const userDecoded = decodeToken(localStorage.getItem("userToken"));

        if (userDecoded) return true;
        return false;
    }


    return (
        <div className = "header__body">
            <nav>
                <NavLink
                    exact to="/"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Accueil
                </NavLink>
                <NavLink
                    to="/commander"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Commander
                </NavLink>

                {isLogged() && 

                <NavLink
                    exact to="/history"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Historique
                </NavLink>
                
                }    

                <NavLink
                    exact to="/contact"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Contact
                </NavLink>
            </nav>
        </div>
    );
}
 
export default HeaderBody;