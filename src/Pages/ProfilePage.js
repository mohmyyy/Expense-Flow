import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../components/store/auth";
// import { AuthContext } from "../components/store/auth-context";
import CompleteProfile from "./CompleteProfile";
import classes from "./ProfilePage.module.css";
const ProfilePage = () => {
  const token = useSelector((state)=> state.auth.token)

  // const autx = authAction(())
  const dispatch = useDispatch()
  const verifyUserHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message.error);
      }
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };
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
      <div className={classes["verify-item"]}>
        <h3>Click here to verify your email</h3>
        <button onClick={verifyUserHandler}>Verify Email</button>
      </div>
    </div>
  );
};

export default ProfilePage;
