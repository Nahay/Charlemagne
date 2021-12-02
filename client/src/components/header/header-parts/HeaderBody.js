import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderBody = ({toggle}) => {

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
                <NavLink
                    to="/a-propos"
                    activeClassName="active-link"
                    onClick={toggle}>
                        À propos
                </NavLink>
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