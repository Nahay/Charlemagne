import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserRouter from './routers/UserRouter';
import AdminRouter from './routers/AdminRouter';
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from 'react-toastify';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

function App() {

  // user passe en dernier sinon il prend le dessus sur tlm

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Switch>

          <ProtectedAdminRoute exact path="/admin" component = {AdminLogin}/>
          <Route path="/admin" component = {AdminRouter} />
          <Route path="/" component = {UserRouter} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;