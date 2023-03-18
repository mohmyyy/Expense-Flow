import { useRef } from "react";
import classes from "./ChangePassword.module.css";

const ChangePassword = () => {
  const emailRef = useRef();
  const changePasswordHandler = async (event) => {
    event.preventDefault();
    const emailId = emailRef.current.value;
    const resposne = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE",
      {
        method: "POST",
        body: JSON.stringify({ requestType: "PASSWORD_RESET", email: emailId }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await resposne.json()
    console.log(data)
  };
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <h2>Forgot Password?</h2>
        <h3>Don't Worry we got you covered</h3>
      </div>
      <div>
        <form
          className={classes["input-field"]}
          onSubmit={changePasswordHandler}
        >
          <input
            type="email"
            ref={emailRef}
            placeholder="Enter your Email here "
          />
          <button> Get Link</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
