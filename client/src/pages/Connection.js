import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { getUserByUsername, updateUserWithPwByUsername, userSignIn } from '../services/usersService';

const Connection = () => {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
     
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const si = await userSignIn(username, password);
        // test si le token est présent dans la promesse qui a été configurée dans le server
        if (si.token) {
          // si il y est
          // on l'ajoute au local storage
          localStorage.setItem('userToken', si.token);
          // récupère un utilisateur par son nom d'utilisateur
          const a = await getUserByUsername(username, si.token);
          console.log(a);
          // si l'utilisateur existe, et le token est valide, redirige vers la page accueil, 
          // sinon reste sur la page de connexion
          if (!a.success)
            history.push('/connexion');
          else {
            history.push("/");
            toast.success("Bienvenue " + username +" !");
          }
        } else {
          toast.error("Le nom d'utilisateur ou le mot de passe est incorrect.");
        }
      }
    return (
        <div className="connection">
            <LoginForm handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLoginSubmit={handleLoginSubmit} 
            username={username}
            password={password}
            />
        </div>
    );
}
 
export default Connection;