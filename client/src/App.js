import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserRouter from './routers/UserRouter';
import AdminRouter from './routers/AdminRouter';
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from 'react-toastify';
import ProtectedLoginRoute from './components/ProtectedLoginRoute';

function App() {

  // user passe en dernier sinon il prend le dessus sur tlm

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Switch>

          <ProtectedLoginRoute exact path="/admin" component = {AdminLogin} isAdmin={true} isAuthenticated={localStorage.getItem("adminToken")}/>
          <Route path="/admin" component = {AdminRouter} />
          <Route path="/" component = {UserRouter} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;