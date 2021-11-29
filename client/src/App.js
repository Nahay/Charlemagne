import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserRouter from './routers/UserRouter';
import AdminRouter from './routers/AdminRouter';
import AdminIndex from "./components/admin/AdminIndex";

function App() {

  // user passe en dernier sinon il prend le dessus sur tlm

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route exact path="/admin" component = {AdminIndex} />
          <Route path="/admin" component = {AdminRouter} />
          <Route path="/" component = {UserRouter} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;