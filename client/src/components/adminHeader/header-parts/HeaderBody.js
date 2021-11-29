import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderBody = ({toggle}) => {

    return (
        <div className = "header__body">
            <nav>
                <NavLink
                    exact to="/admin/accueil"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Accueil
                </NavLink>
                <NavLink
                    to="/admin/plats"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Ajouter plats
                </NavLink>
                <NavLink
                    to="/admin/dates"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Ajouter dates
                </NavLink>
                <NavLink
                    exact to="/admin/compte"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Compte
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