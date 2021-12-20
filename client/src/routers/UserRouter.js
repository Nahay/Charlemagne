import { Switch, Route } from 'react-router-dom';
import ProtectedUserRoute from '../components/ProtectedUserRoute';

import SideNavbar from '../components/header/SideNavbar';
import HeaderIcon from '../components/header/HeaderIcon';

import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Order from '../pages/Order';
import PassCommand from '../pages/PassCommand';
import Login from '../pages/Login';

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
                    <Route exact path="/passer-commande/:date" component = {PassCommand} />
                    <Route exact path="/contact" component = {Contact} />
                    <Route exact path="/mentions-legales" component = {Home} />
                    <Route exact path="/cgu-cgv" component = {Home} />
                    <ProtectedUserRoute exact path="/connexion" component = {Login}/>

                    <Route exact component = {PageNotFound} />
                </Switch>
            </main>
        </>
    );
}

export default UserTemp;