import { Switch, Route } from 'react-router-dom';
import SideNavbar from '../components/header/SideNavbar';
import HeaderIcon from '../components/header/HeaderIcon';

import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Order from '../pages/Order';
import Connection from '../pages/Connection';

import PageNotFound from '../pages/PageNotFound';
import ProtectedLoginRoute from '../components/ProtectedLoginRoute';


const UserTemp = () => {
    
    return ( 
        <>
            <SideNavbar admin={false}/>
            <HeaderIcon admin={false}/>
            <main className="main">
                <Switch>
                    <Route exact path="/" component = {Home} />

                    <Route exact path="/commander" component = {Order} />
                    <Route exact path="/a-propos" component = {About} />
                    <Route exact path="/contact" component = {Contact} />
                    <Route exact path="/mentions-legales" component = {Home} />
                    <Route exact path="/cgu-cgv" component = {Home} />
                    <ProtectedLoginRoute exact path="/connexion" component = {Connection} isAdmin={false} isAuthenticated={localStorage.getItem("userToken")}/>

                    <Route exact component = {PageNotFound} />
                </Switch>
            </main>
        </>
    );
}

export default UserTemp;