import { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./NavBar.module.css";
import { AuthContext } from "./store/auth-context";

const NavBar = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const authHandler = () => {
    ctx.onLoggedOut();
    history.replace("/auth");
  };
  return (
    // <header>
    <nav className={classes.nav}>
      <a href="/" className={classes["nav-logo"]}>
        Expense Flow
      </a>
      <ul>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/track-expense">Track Expense</a>
        </li>
        <li>
          {!ctx.isLoggedIn && <button onClick={authHandler}>LogIn</button>}
          {ctx.isLoggedIn && <button onClick={authHandler}>Logout</button>}
        </li>
      </ul>
    </nav>
    // </header>
  );
};

export default NavBar;
