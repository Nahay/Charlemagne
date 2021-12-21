import React from 'react';

import InputButton from './generic/InputButton';
import InputText from './generic/InputText';
import InputPassword from "./generic/InputPassword";


const LoginForm = ({handleUsernameChange, handlePasswordChange, handleLoginSubmit, username, password}) => {  
      
    return ( 
        <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="login-form__content">
                <InputText placeholder="Nom d'utilisateur" handleChange={handleUsernameChange} value={username}/>
                <InputPassword placeholder="Mot de passe" handleChange={handlePasswordChange} value={password}/>
                <span>Mot de passe oublié ?</span>
                <InputButton value="Login" type="submit"/>
            </div>
        </form>
    );
}

export default LoginForm;