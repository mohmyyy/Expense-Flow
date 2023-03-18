import CompleteProfile from "./CompleteProfile";
import classes from "./ProfilePage.module.css";
const ProfilePage = () => {
  return (
    <div>
      <div className={classes.header}>
        <h2> Welcome to Expense Tracker!! </h2>
        <h2>
          Your profile is incomplete{" "}
          <span>
            <a href="/complete-profile">Complete Now</a>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ProfilePage;
