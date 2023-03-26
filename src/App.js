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
import { useSelector } from "react-redux";
// import { AuthContext } from "./components/store/auth-context";

function App() {
  // const autx = useContext(AuthContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <CartContextProvider>
        <Switch>
          <Layout>
            <Route path="/" exact>
              {isLoggedIn && <Redirect to="/track-expense" />}
              {!isLoggedIn && <Redirect to="/Auth" />}
            </Route>
            <Route path="/profile" exact>
              <ProfilePage />
            </Route>
            {!isLoggedIn && (
              <Route path="/Auth">
                <AuthPage />
              </Route>
            )}
            <Route path="/complete-profile">
              <CompleteProfile />
            </Route>
            <Route path="/change-password">
              <ChangePassword />
            </Route>
            {isLoggedIn && (
              <Route path="/track-expense">
                <TrackExpenses />
              </Route>
            )}
            {isLoggedIn && (
              <Route path="/Auth">
                <Redirect to="/" />
              </Route>
            )}
          </Layout>
        </Switch>
      </CartContextProvider>
    </div>
  );
}

export default App;
