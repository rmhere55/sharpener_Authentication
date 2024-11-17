import { Link, } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext, useState } from 'react';
import { authContext } from '../../store/authContext';
import { Redirect } from 'react-router-dom';

const MainNavigation = () => {
  const { token, logout } = useContext(authContext)
  const [isLogout, isLetLogout] = useState(false);

  const logoutHandler = () => {
    isLetLogout(true)
    logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {
            (token)
              ?
              <>
                <li>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </>
              :
              <li>
                <button onClick={logoutHandler}>Login</button>
                {
                  isLogout &&
                  <Redirect to="/auth" />
                }
              </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
