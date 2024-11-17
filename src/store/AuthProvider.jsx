import { useState } from "react";
import { authContext } from "./authContext";
import { checkTokenValidity } from "../Firebase/authFun";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };
  
  const logout = (isExpired = true) => {
    if (isExpired){
      localStorage.removeItem('token');
      setToken("");
    } 
  };
  
  checkTokenValidity(logout);

  return (
    <authContext.Provider
      value={{ token, login, logout }}
    >
      {children}
    </authContext.Provider>
  );
};


export default AuthProvider;