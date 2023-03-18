import React, { useState } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  onLogIn: () => {},
  onLoggedOut: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");

  const userLoggedIndetails = !!token;

  const checkLoginStatus = localStorage.getItem("token");
  console.log(checkLoginStatus);

  const loginHandler = (token) => {
    setToken(() => token);
    localStorage.setItem("token", token);
  };

  const loggedOutHandler = () => {
    setToken(() => null);
    localStorage.removeItem("token");
  };

  const authObj = {
    token: checkLoginStatus,
    isLoggedIn: userLoggedIndetails,
    onLogIn: loginHandler,
    onLoggedOut: loggedOutHandler,
  };

  console.log(authObj)

  return (
    <AuthContext.Provider value={authObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
