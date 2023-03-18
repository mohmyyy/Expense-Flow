import { useCallback, useContext } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import "./App.css";

import AuthPage from "./Pages/Authentication/AuthPage";
import ProfilePage from "./Pages/ProfilePage";
import { AuthContext } from "./components/store/auth-context";
import AuthContextProvider from "./components/store/auth-context";
import CompleteProfile from "./Pages/CompleteProfile";
import Layout from "./components/Layout";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  const ctx = useContext(AuthContext);
  console.log(ctx);
  return (
    <div className="App">
      <AuthContextProvider>
        <Switch>
          <Layout>
            <Route path="/" exact>
              <Redirect to="/profile" />
            </Route>
            <Route path="/profile" exact>
              <ProfilePage />
            </Route>
            <Route path="/Auth">
              <AuthPage />
            </Route>
            <Route path="/complete-profile">
              <CompleteProfile />
            </Route>
            <Route path="/change-password">
              <ChangePassword />
            </Route>
          </Layout>
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
