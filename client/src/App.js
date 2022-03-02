import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';

import ProtectedLoginRoute from './components/routes/admin/ProtectedLoginRoute';
import UserRouter from './routers/UserRouter';
import AdminRouter from './routers/AdminRouter';
import AdminLogin from "./pages/admin/AdminLogin";


import 'react-toastify/dist/ReactToastify.css';


function App() {

  useEffect(() => {

    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      document.documentElement.setAttribute('data-theme', localTheme);
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    else document.documentElement.setAttribute('data-theme', 'light');
    
  }, []);


  const switchTheme = (newTheme) => {
    
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    newTheme === 'light' && toast.success('Thème clair appliqué !')
    newTheme === 'dark' && toast.success('Thème sombre appliqué !')
  }

  // user passe en dernier sinon il prend le dessus sur tlm

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Switch>

          <ProtectedLoginRoute exact path="/admin" component = {AdminLogin}/>
          <Route path="/admin">
            <AdminRouter switchTheme={switchTheme}/>
          </Route>
          <Route path="/">
            <UserRouter switchTheme={switchTheme}/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;