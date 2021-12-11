import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { faUser, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputText from '../../components/generic/InputText';
import InputButton from '../../components/generic/InputButton';
import InputNumber from '../../components/generic/InputNumber';
import InputEmail from '../../components/generic/InputEmail';
import AccountList from '../../components/admin/AccountList';

import { createUser, deleteUserByUsername, getUsers, updateUserWithoutPw, updateUserWithPw } from '../../services/usersService';
import { createAdmin, deleteAdminByUsername, getAdmins, updateAdminWithoutPw, updateAdminWithPw} from '../../services/adminsService';


const AdminAccounts = () => {
    const token = localStorage.getItem("adminToken");

    const [admin, setAdmin] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");

    const [create, setCreate] = useState(true);
    const [watchClients, setWatchClients] = useState(true);
    const [clientAccountList, setClientAccountList] = useState([]);
    const [adminAccountList, setAdminAccountList] = useState([]);

    const nameReg = /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'-]+$/;
    const emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


    useEffect(() => {

        const token = localStorage.getItem("adminToken");

        async function getClientAccountList() {
            const clients = await getUsers(token);
            setClientAccountList(clients.users);
        }
    
        async function getAdminAccountList() {
            const admins = await getAdmins(token);
            setAdminAccountList(admins.admins);
        }

        getClientAccountList();
        getAdminAccountList();

    }, []);
    

    // RESET VALUES -----------------------------------------------------

    const resetValues = () => {
        setCreate(true);

        setAdmin(false);
        setEmail("");
        setUsername("");
        setPassword("");
        setName("");
        setFirstname("");
        setTel("");
    }

    const onClickClientAccount = (email, username, name, firstname, tel) => {    
        setAdmin(false);
        setCreate(false);
        setEmail(email);
        setUsername(username);
        setPassword("");
        setName(name);
        setFirstname(firstname);
        setTel(tel);
    }

    const onClickAdminAccount = (username) => {
        setAdmin(true);
        setCreate(false);
        setUsername(username);
        setPassword("");
    }

    // HANDLE ------------------------------------------------------------

    const handleCheckboxChange = (e) => e.target.checked = true;

    const handleAdminChange = (e) => {
        if (e.target.id ==='y') setAdmin(true);
        else setAdmin(false);
    }

    const handleEmail = (e) => setEmail(e.target.value);

    const handleUsername = (e) => setUsername(e.target.value);

    const handlePassword = (e) => setPassword(e.target.value);

    const handleName = (e) => {
        const val = e.target.value;
        if (nameReg.test(val) || val === "") setName(val);
    }   

    const handleFirstname = (e) => {
        const val = e.target.value;
        if (nameReg.test(val) || val === "") setFirstname(val);
    }

    const handleTel = (e) => {
        const val = e.target.value;
        if (Number(val) || val === "") setTel(val);
    }

    // DB -------------------------------------------------------------

    const getClientAccountList = async () => {
        const clients = await getUsers(token);
        setClientAccountList(clients.users);
    }

    const getAdminAccountList = async () => {
        const admins = await getAdmins(token);
        setAdminAccountList(admins.admins);
    }

    const onClickDelete = async (username) => {

        if (watchClients) {
            await deleteUserByUsername(username, token);
            getClientAccountList();
        }
        else {
            await deleteAdminByUsername(username, token);
            getAdminAccountList();
        } 
    }

    const onSubmit = async (e) => {

        e.preventDefault();

        try {

            // création d'un utilisateur
            if (create) {

                if (admin) {

                    // ajout bdd admin
                    await createAdmin(username, password, token);
                    getAdminAccountList();
                    resetValues();
                }
                else {
        
                    if (emailReg.test(email)) {

                        // ajout bdd client
                        await createUser(username, password, name, firstname, email, tel, token);
                        getClientAccountList();
                        resetValues();
                    }
                    
                    else toast.error("Email non valide.");
                }
            }

            // modification d'un utilisateur
            else {
                if (admin) {
                    // mot de passe inchangé
                    if (password === "") {
                        // update bdd admin sans mdp
                        await updateAdminWithoutPw(username, token);
                    }
                    // update bdd admin
                    await updateAdminWithPw(username, password, token);
                    getAdminAccountList();
                }
                else {        
                    if (emailReg.test(email)) {
                        if (password === "") {
                            // update bdd client sans mdp
                            await updateUserWithoutPw(username, name, firstname, email, tel, token);
                        }
                        // update bdd client
                        await updateUserWithPw(username, password, name, firstname, email, tel, token);
                        getClientAccountList();
                    }                    
                    else toast.error("Email non valide.");
                }

            }
        }
        catch(err) {
            toast.error("Il y a eu une erreur.");
        }
    }


    // RENDER ----------------------------------------------------------

    // si create on met le radio sinon on l'enlève
    // selon admin ou pas aussi

    return (
        <div className="admin-accounts">

            <div className="admin-accounts__left">
                <div className="left__account-list">

                    <div className="left__icons">
                        <FontAwesomeIcon
                        icon={faUser}
                        onClick={() => setWatchClients(true)}
                        />
                        <FontAwesomeIcon
                        icon={faUserCog}
                        onClick={() => setWatchClients(false)}
                        />
                    </div>

                    <AccountList
                        watchClients={watchClients}
                        accountList={watchClients ? clientAccountList : adminAccountList}
                        onClickClientAccount={onClickClientAccount}
                        onClickAdminAccount={onClickAdminAccount}
                        onClickDelete={onClickDelete}
                    />

                </div>
            </div>
            <div className="admin-accounts__right">
                <div className="right__content">
                    <div className="btn">
                        <button onClick={resetValues}>Nouvel Utilisateur</button>
                    </div>
                        
                    <form className="right__content__form" onSubmit={onSubmit}>

                        { create &&

                            <div className="right__content__form__radio" onChange={handleAdminChange}>
                                <span>Admin ?</span>
                                <input
                                    type="radio"
                                    value="Non"
                                    name="admin"
                                    id="n"
                                    checked={admin === false}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="n">Non</label>
                                <input
                                    type="radio" 
                                    value="Oui"
                                    name="admin"
                                    id="y"
                                    checked={admin === true}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="y">Oui</label>
                            </div>
                        }

                        { admin ?

                            <div className="admin-form">
                                <InputText
                                    value={username}
                                    placeholder="Nom d'utilisateur*"
                                    id="username"
                                    divId="divUsername"
                                    handleChange={handleUsername}
                                />
                                <InputText
                                    value={password}
                                    placeholder={create ? "Mot de passe*" : "Changer mot de passe"}
                                    id="password"
                                    divId="divPassword"
                                    required={create ? true : false}
                                    handleChange={handlePassword}
                                />
                                <InputButton value={create? "Créer" : "Enregistrer"}/>
                            </div>
                        
                        :
                            
                            <div className="admin-form">
                                <InputEmail
                                    value={email}
                                    placeholder="Email*"
                                    id="email"
                                    divId="divEmail"
                                    handleChange={handleEmail}
                                />
                                <InputText
                                    value={username}
                                    placeholder="Nom d'utilisateur*"
                                    id="username"
                                    divId="divUsername"
                                    handleChange={handleUsername}
                                />
                                <InputText
                                    value={password}
                                    placeholder={create ? "Mot de passe*" : "Changer mot de passe"}
                                    id="password"
                                    divId="divPassword"
                                    required={create ? true : false}
                                    handleChange={handlePassword}
                                />
                                <InputText
                                    value={name}
                                    placeholder="Nom*"
                                    id="name"
                                    divId="divName"
                                    handleChange={handleName}
                                />
                                <InputText
                                    value={firstname}
                                    placeholder="Prénom*"
                                    id="firstname"
                                    divId="divFirstname"
                                    handleChange={handleFirstname}
                                />
                                <InputNumber
                                    value={tel}
                                    placeholder="Tel"
                                    id="tel"
                                    divId="divTel"
                                    required={false}
                                    handleChange={handleTel}
                                />
                                <InputButton value={create? "Créer" : "Enregistrer"}/>
                            </div>

                        }

                    </form>
                        
                </div>
            </div>
        </div>
    );
};

export default AdminAccounts;