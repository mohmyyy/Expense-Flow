import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { AuthContext } from "./components/store/auth-context";
// import AuthContextProvider from "./components/store/auth-context";
import { Provider } from "react-redux";
import store from "./components/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
