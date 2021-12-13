import { Switch } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import SideNavbar from "../components/header/SideNavbar";
import HeaderIcon from "../components/header/HeaderIcon";

import AdminHome from "../pages/admin/AdminHome";
import AdminDishes from "../pages/admin/AdminDishes";
import AdminDates from "../pages/admin/AdminDates";
import AdminCommands from "../pages/admin/AdminCommands";
import AdminAccounts from "../pages/admin/AdminAccounts";

import PageNotFound from '../pages/PageNotFound';


const AdminTemp = ({ match }) => {
  // match.url prend le chemin par défaut = /admin
  // path={ match.url + '/userlist' }

  return (
    <>
      <SideNavbar admin={true}/>
      <HeaderIcon admin={true}/>
      <main className="main">
        <Switch>
          <ProtectedRoute exact path={match.url + '/accueil'} component={AdminHome} />
          <ProtectedRoute exact path={match.url + '/plats'} component={AdminDishes} />
          <ProtectedRoute exact path={match.url + '/dates'} component={AdminDates} />
          <ProtectedRoute exact path={match.url + '/commandes'} component={AdminCommands} />
          <ProtectedRoute exact path={match.url + '/comptes'} component={AdminAccounts} />
          <ProtectedRoute exact component = {PageNotFound} />
        </Switch>
      </main>
    </>
  );
};

export default AdminTemp;
