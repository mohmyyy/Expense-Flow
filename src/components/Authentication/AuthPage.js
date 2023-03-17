import { useRef, useState } from "react";
import classes from "./AuthPage.module.css";

const AuthPage = () => {
  const [islogin, setIsLogin] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;

    let url;
    if (islogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE";
    } else {

      const userConfirmedPassword = confirmPasswordRef.current.value;
      if (userPassword === userConfirmedPassword) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE";
      } else {
        alert("PASSWORD DOES NOT MATCH");
      }
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data)
        throw new Error(data.error.message);
      }
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  const changeAuthHandler = () => {
    setIsLogin((prevValue) => !prevValue);
  };

  return (
    <div className={classes.ctn}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <h1>{islogin ? "Login" : "Sign Up"}</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        {!islogin && (
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
          />
        )}
        <button>{islogin ? "Log In" : "Sign Up"}</button>
      </form>
      <button onClick={changeAuthHandler} className={classes.btn}>
        {islogin
          ? "Don't Have an Account? (Sign Up)"
          : " Have an account? (Log In)"}
      </button>
    </div>
  );
};

export default AuthPage;
