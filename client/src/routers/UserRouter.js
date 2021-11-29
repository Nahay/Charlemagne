import { Switch, Route } from 'react-router-dom';
import SideNavbar from '../components/header/SideNavbar';
import HeaderIcon from '../components/header/HeaderIcon';

import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Lycee from '../pages/Lycee';
import Order from '../pages/Order';

import PageNotFound from '../pages/PageNotFound';

const UserTemp = () => {
    
    return ( 
        <>
            <SideNavbar/>
            <HeaderIcon/>
            <main className="main">
            <Switch>
                <Route exact path="/" component = {Home} />

                <Route exact path="/commander" component = {Order} />
                <Route exact path="/a-propos" component = {About} />
                <Route exact path="/le-lycee" component = {Lycee} />
                <Route exact path="/contact" component = {Contact} />
                <Route exact path="/mentions-legales" component = {Home} />
                <Route exact path="/cgu-cgv" component = {Home} />

                <Route exact component = {PageNotFound} />
            </Switch>
            </main>
        </>
    );
}

export default UserTemp;