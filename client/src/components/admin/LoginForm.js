import React from 'react';
import InputButton from '../generic/InputButton';
import InputText from '../generic/InputText';
import InputPassword from '../generic/InputPassword';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

    const history = useHistory();
    
    const handleChange = (e) => { }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

    return ( 
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__content">
                <InputText placeholder="Nom d'utilisateur" id="username" handleChange={handleChange}/>
                <InputPassword placeholder="Mot de passe" id="password" handleChange={handleChange}/>
                <span>Mot de passe oublié ?</span>
                <InputButton value="Login"/>
            </div>
        </form>
    );
}

export default LoginForm;