import { useCallback, useContext } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthPage from "./Pages/Authentication/AuthPage";
import ProfilePage from "./Pages/ProfilePage";
import { AuthContext } from "./components/store/auth-context";
import AuthContextProvider from "./components/store/auth-context";
import CompleteProfile from "./Pages/CompleteProfile";

function App() {
  const ctx = useContext(AuthContext);
  console.log(ctx);
  return (
    <div className="App">
      <AuthContextProvider>
        <Switch>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/Auth">
            <AuthPage />
          </Route>
          <Route path="/complete-profile">
            <CompleteProfile />
          </Route>
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
