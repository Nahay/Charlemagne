import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { decodeToken } from 'react-jwt';

import PasswordForm from '../components/PasswordForm';

import { updateFirstConn } from '../services/usersService';



const MdpForm = () => {

    const history = useHistory();

    const [password, setPassword] = useState("");
     

    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("userToken");
        const dT = decodeToken(token);

        const si = await updateFirstConn(dT._id, dT.username, dT.name, dT.firstname, dT.email, password, token);
        localStorage.setItem('userToken', si.token);
        
        history.push('/');
    }


    return (
        <div className="login-container">
            <PasswordForm
              handlePasswordChange={handlePasswordChange}
              handlePasswordSubmit={handlePasswordSubmit}  
              password={password}
            />
            <div className="login-icon">
                <FontAwesomeIcon icon={faUsers}/>
            </div>
        </div>
    );
}
 
export default MdpForm;