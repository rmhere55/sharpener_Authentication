import { Route, Switch, Redirect } from "react-router-dom";

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { authContext } from "./store/authContext";
import { useContext } from "react";

function App() {

  const { token } = useContext(authContext)

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>

        {!token
          &&
          <Route path='/auth'>
            <AuthPage />
          </Route>
        }

        <Route path='/profile'>
          {token &&
            <UserProfile />
          }

          {!token && <Redirect to="/auth" />}
        </Route>

        <Route path='*'>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
