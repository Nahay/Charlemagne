import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { userSignIn } from '../services/usersService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
     
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const si = await userSignIn(username, password);
        console.log(si);
        // test si le token est présent dans la promesse qui a été configurée dans le server
        if (si.token) {
          // si il y est, on l'ajoute au local storage
          localStorage.setItem('userToken', si.token);
          history.push("/");
          toast.success("Bienvenue " + username +" !");          
        } else {
          toast.error("Le nom d'utilisateur ou le mot de passe est incorrect.");
        }
      }
    return (
        <div className="login-container">
            <LoginForm handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLoginSubmit={handleLoginSubmit} 
            username={username}
            password={password}
            />
            <div className="login-icon">
                <FontAwesomeIcon icon={faUsers}/>
            </div>
        </div>
    );
}
 
export default Login;