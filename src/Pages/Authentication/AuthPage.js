import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../components/store/auth-context";
import classes from "./AuthPage.module.css";

const AuthPage = () => {
  const [islogin, setIsLogin] = useState(false);
  const [openEye, closeEye] = useState("open-eye-icon.png");
  const [text, setPassword] = useState("password");
  const history = useHistory();
  console.log(history);
  const ctx = useContext(AuthContext);
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
        console.log(data);
        throw new Error(data.error.message);
      } else {
        // history.replace("/Home");
        ctx.onLogIn(data.idToken);
        history.replace("/profile");
      }
      console.log(data.idToken);
    } catch (error) {
      alert(error);
    }
  };

  const eyeHandler = () => {
    if (text === "password") {
      setPassword("text");
      closeEye("closed-eye-icon.png");
    } else {
      setPassword("password");
      closeEye("open-eye-icon.png");
    }
  };

  const changeAuthHandler = () => {
    setIsLogin((prevValue) => !prevValue);
  };

  return (
    <div className={classes.ctn}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <h1>{islogin ? "Login" : "Sign Up"}</h1>
        <input
          className={classes.input}
          ref={emailRef}
          type="email"
          placeholder="Email"
        />
        <div className={classes.password}>
          <input ref={passwordRef} type={text} placeholder="Password" />
          <img src={openEye} onClick={eyeHandler} alt="see password" />
        </div>
        {!islogin && (
          <div className={classes.password}>
            <input
              ref={confirmPasswordRef}
              type={text}
              placeholder="Confirm Password"
            />
            <img src={openEye} onClick={eyeHandler} alt="see password" />
          </div>
        )}
        <button>{islogin ? "Log In" : "Sign Up"}</button>
        <span className={classes.link}>
          <a href='/home'>Forgot password?</a>
        </span>
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
