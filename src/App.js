import { useCallback, useContext } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import "./App.css";

import AuthPage from "./Pages/Authentication/AuthPage";
import ProfilePage from "./Pages/ProfilePage";
import CompleteProfile from "./Pages/CompleteProfile";
import Layout from "./components/Layout";
import ChangePassword from "./Pages/ChangePassword";
import TrackExpenses from "./Pages/TrackExpenses";
import CartContextProvider, {
  CartContext,
} from "./components/store/cart-context";
import { AuthContext } from "./components/store/auth-context";

function App() {
  const autx = useContext(AuthContext)
  return (
    <div className="App">
        <CartContextProvider>
          <Switch>
            <Layout>
              <Route path="/" exact>
                <Redirect to="/profile" />
              </Route>
              <Route path="/profile" exact>
                <ProfilePage />
              </Route>
              {!autx.isLoggedIn && <Route path="/Auth">
                <AuthPage />
              </Route>}
              <Route path="/complete-profile">
                <CompleteProfile />
              </Route>
              <Route path="/change-password">
                <ChangePassword />
              </Route>
              {autx.isLoggedIn && (
                <Route path="/track-expense">
                  <TrackExpenses />
                </Route>
              )}
              {/* {autx.isLoggedIn && <Redirect to="/" />} */}
            </Layout>
          </Switch>
        </CartContextProvider>
    </div>
  );
}

export default App;
