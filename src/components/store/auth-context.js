import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  onLogIn: () => {},
  onLoggedOut: () => {},
});

const AuthContextProvider = (props) => {
  const checkLoginStatus = localStorage.getItem("token");
  const [token, setToken] = useState(checkLoginStatus);

  const userLoggedIndetails = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const loggedOutHandler = () => {
    setToken(() => null);
    localStorage.removeItem("token");
  };

  const authObj = {
    token: token,
    isLoggedIn: userLoggedIndetails,
    onLogIn: loginHandler,
    onLoggedOut: loggedOutHandler,
  };

  console.log(authObj);

  return (
    <AuthContext.Provider value={authObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

// export default AuthContextProvider;
