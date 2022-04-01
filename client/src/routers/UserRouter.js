import { Switch, Route } from 'react-router-dom';

import ProtectedUserRoute from '../components/routes/user/ProtectedUserRoute';

import SideNavbar from '../components/header/SideNavbar';
import HeaderIcon from '../components/header/HeaderIcon';

import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Order from '../pages/Order';
import PassCommand from '../pages/user/PassCommand';
import Login from '../pages/Login';
import History from '../pages/user/History';
import MdpForm from '../pages/MdpForm';

import PageNotFound from '../pages/PageNotFound';


const UserTemp = () => {
    
    return ( 
        <>
            <SideNavbar admin={false}/>
            <HeaderIcon admin={false}/>
            <main className="main">
                <Switch>
                    <Route exact path="/" component = {Home} />

                    <Route exact path="/commander" component = {Order} />
                    <ProtectedUserRoute exact path="/passer-commande/:date" component = {PassCommand} />
                    <Route exact path="/contact" component = {Contact} />
                    <ProtectedUserRoute exact path="/historique" component = {History} />
                    <ProtectedUserRoute exact path="/connexion" component = {Login} />
                    <ProtectedUserRoute exact path="/changer-mdp" component = {MdpForm} />

                    <Route exact component = {PageNotFound} />
                </Switch>
            </main>
        </>
    );
}

export default UserTemp;