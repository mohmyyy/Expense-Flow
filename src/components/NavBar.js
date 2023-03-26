import { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./NavBar.module.css";
// import { AuthContext } from "./store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth";

const NavBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const authHandler = () => {
    history.replace("/auth");
    dispatch(authAction.logout());
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
        {!isLoggedIn && (
          <li>
            <a href="/auth">Log In</a>
          </li>
        )}
        <li>
          {isLoggedIn && <button onClick={authHandler}>Logout</button>}
        </li>
      </ul>
    </nav>
    // </header>
  );
};

export default NavBar;
