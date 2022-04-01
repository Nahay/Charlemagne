import React from 'react';

import InputButton from './generic/InputButton';
import InputPassword from "./generic/InputPassword";


const PasswordForm = ({handlePasswordChange, handlePasswordSubmit, password}) => {  
      
    return ( 
        <form className="login-form" onSubmit={handlePasswordSubmit}>
            <div className="login-form__content">
                <div className="content__title">Pour votre première connexion, veuillez changer votre mot de passe.</div>
                <InputPassword placeholder="Mot de passe" handleChange={handlePasswordChange} value={password}/>
                <InputButton value="Changer le mot de passe" type="submit"/>
            </div>
        </form>
    );
}

export default PasswordForm;