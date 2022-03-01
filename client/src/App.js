import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';

import ProtectedLoginRoute from './components/routes/admin/ProtectedLoginRoute';
import UserRouter from './routers/UserRouter';
import AdminRouter from './routers/AdminRouter';
import AdminLogin from "./pages/admin/AdminLogin";

import 'react-toastify/dist/ReactToastify.css';


function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const switchTheme = (newTheme) => {
    
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);

    document.documentElement.setAttribute("data-theme", theme);

    newTheme === 'light' && toast.success('Thème clair')
    newTheme === 'dark' && toast.success('Thème sombre')

    console.log(document.documentElement);
  }

  // user passe en dernier sinon il prend le dessus sur tlm

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Switch>

          <ProtectedLoginRoute exact path="/admin" component = {AdminLogin}/>
          <Route path="/admin" component = {AdminRouter} />
          <Route path="/">
            <UserRouter switchTheme={switchTheme}/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;