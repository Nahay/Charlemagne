import { Switch, Route } from "react-router-dom";
import AdminIndex from "../components/admin/AdminIndex";
import AdminHome from "../components/admin/AdminHome";
import AdminSideNavbar from '../components/adminHeader/SideNavbar';
import HeaderIcon from '../components/adminHeader/HeaderIcon';

const AdminTemp = ({ match }) => {
  // match.url prend le chemin par défaut = /admin
  // path={ match.url + '/userlist' }

  return (
    <>
    <AdminSideNavbar/>
    <HeaderIcon/>
      <main className="mainAdmin">
        <Switch>
          <Route exact path={match.url + '/accueil'} component={AdminHome} />
        </Switch>
      </main>
    </>
  );
};

export default AdminTemp;
