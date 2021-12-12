import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminHeaderBody = ({toggle}) => {

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
                        Plats
                </NavLink>
                <NavLink
                    to="/admin/dates"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Dates
                </NavLink>
                <NavLink
                    to="/admin/commandes"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Commandes
                </NavLink>
                <NavLink
                    exact to="/admin/comptes"
                    activeClassName="active-link"
                    onClick={toggle}>
                        Comptes
                </NavLink>
            </nav>
        </div>
    );
}
 
export default AdminHeaderBody;