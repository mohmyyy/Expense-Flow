import classes from "./NavBar.module.css";

const NavBar = () => {
  return (
    // <header>
    <nav className={classes.nav}>
      <a href="/" className={classes["nav-logo"]}>
        Expense Flow
      </a>
      <ul>
        <li className={()=>classes.active}>
          <a href="/Home">Home</a>
        </li>
        <li>
          <a href="/Product">Product</a>
        </li>
      </ul>
    </nav>
    // </header>
  );
};

export default NavBar;
