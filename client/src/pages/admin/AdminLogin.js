import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { adminSignIn, getAdminByUsername, createAdmin } from "../../services/adminsService";

const AdminLogin = () => {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
     
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const si = await adminSignIn(username, password);
        // test si le token est présent dans la promesse qui a été configurée dans le server
        if (si.token) {
          // si il y est, on l'ajoute au local storage
          localStorage.setItem('adminToken', si.token);
          history.push("/admin/accueil");
          toast.success("Bienvenue " + username + " !");
        } else {
          toast.error("Le nom d'utilisateur ou le mot de passe est incorrect.");
        }
      }
            
    return ( 
        <div className="admin-login">
            <LoginForm 
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLoginSubmit={handleLoginSubmit}
            username={username}
            password={password} />
            <div className="admin-icon">
                <FontAwesomeIcon icon={faUsersCog}/>
            </div>
        </div>
    );
}

export default AdminLogin;