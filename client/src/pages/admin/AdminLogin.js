import React from 'react';
import LoginForm from '../../components/admin/LoginForm';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AdminLogin = () => {

    return ( 
        <div className="admin-login">
            <LoginForm/>
            <div className="admin-icon">
                <FontAwesomeIcon icon={faUsersCog}/>
            </div>
        </div>
    );
}

export default AdminLogin;