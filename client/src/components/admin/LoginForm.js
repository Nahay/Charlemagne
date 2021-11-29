import React from 'react';
import InputButton from '../generic/InputButton';
import InputText from '../generic/InputText';
import { getAdminById, getAdminByUsername, createAdmin, updateAdmin } from "../../services/adminsService";
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {

    const history = useHistory();

    const notifyAdmin = () => 
        toast.error('Le nom d\'utilisateur saisi n\'est pas correct.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    );

    const notifyPassword = () => 
        toast.error('Le mot de passe saisi n\'est pas correct.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    );
    
    const handleChange = (e) => { }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const username = e.target[0].value;
        const password = e.target[1].value;

        // récupère un admin dans la base de donnée avec le nom d'utilisateur entré
        // renvoie null si aucun administrateur n'a été trouvé
        // renvoie l'objet qui contient toutes les données de l'admin sinon
        const admin = await getAdminByUsername(username);
        // si l'admin a été trouvé
        if (admin != null) {
            // si le nom d'utilisateur et le mot de passe entrés sont corrects
            if (username === admin.username && password === admin.password) {
                // redirige vers l'accueil
                history.push("/admin/accueil");         
            }
            // sinon indique que le mot de passe entré est incorrect
            else notifyPassword();
        }
        // si l'admin n'a pas été trouvé
        // indique qu'il n'y a aucun compte ayant ce nom d'utilisateur
        else notifyAdmin();
    }

    return ( 
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__content">
                <InputText placeholder="Nom d'utilisateur" id="username" handleChange={handleChange}/>
                <InputText placeholder="Mot de passe" id="password" handleChange={handleChange}/>
                <span>Mot de passe oublié ?</span>
                <InputButton value="Login"/>
                <ToastContainer />
            </div>
        </form>
    );
}

export default LoginForm;