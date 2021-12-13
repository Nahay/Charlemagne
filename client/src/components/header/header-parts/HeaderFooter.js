import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import SocialMediaList from '../SocialMediaList';
import Logout from '../../generic/Logout';


const HeaderFooter = ({admin, toggle}) => {

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
        <div className = "header__footer">

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
            
            <SocialMediaList/>
            <div className = "footer__cg">
                <Link
                    to="/mentions-legales"
                    onClick={toggle}
                    rel={admin? "noopener noreferrer" : ""}
                    target={admin ? "_blank" : ""}
                >
                    Mentions légales
                </Link>
                <Link
                    to="/cgu-cgv"
                    onClick={toggle}
                    rel={admin? "noopener noreferrer" : ""}
                    target={admin ? "_blank" : ""}
                >
                    CGU/CGV
                </Link>
            </div>
        </div>
    );
}
 
export default HeaderFooter;