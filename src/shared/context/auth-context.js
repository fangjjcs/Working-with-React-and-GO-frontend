import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
 
  const initToken = localStorage.getItem("token")
  const [token, setToken] = useState(initToken);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token)
  };

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token")

  };

  const contextValue = {
    token: token,
    isLogin: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
