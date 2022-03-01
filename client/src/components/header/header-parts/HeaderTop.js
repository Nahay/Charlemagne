import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import Logo from '../../generic/Logo';
import Logout from '../../generic/Logout';


const HeaderTop = ({admin, toggle}) => {

    const history = useHistory();

    const handleAdminLogout = () => {
        localStorage.removeItem('adminToken');
        history.push('/admin');
        toast.success('Vous avez été déconnecté.');
    }
    
    const handleUserLogout = () => {
        localStorage.removeItem('userToken');
        history.push('/connexion');
        toast.success('À bientôt !');
    }

    const handleUserLogin = () => history.push('/connexion');


    return (
        <div className = "header__top">
            <Link
                to = "/"
                onClick={toggle}
                rel={admin? "noopener noreferrer" : ""}
                target={admin ? "_blank" : ""}
            >
                <Logo/>
                <span>Le Charlemagne</span>
            </Link>

            { admin ?
                <Logout
                    handleLogout={handleAdminLogout}
                    isAdmin={true}
                    isAuthenticated={localStorage.getItem("adminToken")}
                />
            :
            
                <Logout
                    handleLogout={handleUserLogout}
                    handleLogin={handleUserLogin}
                    isAdmin={false}
                    isAuthenticated={localStorage.getItem("userToken")}
                />
            }
        </div>
    );
}
 
export default HeaderTop;