import React from 'react';
import InputButton from './generic/InputButton';
import InputText from './generic/InputText';
import InputPassword from "./generic/InputPassword";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({handleUsernameChange, handlePasswordChange, handleLoginSubmit, username, password}) => {    
    return ( 
        <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="login-form__content">
                <InputText placeholder="Nom d'utilisateur" id="username" handleChange={handleUsernameChange} value={username}/>
                <InputPassword placeholder="Mot de passe" id="password" handleChange={handlePasswordChange} value={password}/>
                <span>Mot de passe oublié ?</span>
                <InputButton value="Login"/>
            </div>
        </form>
    );
}

export default LoginForm;