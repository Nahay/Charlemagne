import React from 'react';
import LoginForm from './LoginForm';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AdminIndex = () => {

    return ( 
        <div className="admin-index">
            <LoginForm/>
            <div className="admin-icon">
                <FontAwesomeIcon icon={faUsersCog}/>
            </div>
        </div>
    );
}

export default AdminIndex;