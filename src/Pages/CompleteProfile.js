import { useContext, useEffect, useRef, useState } from "react";
import classes from "./CompleteProfile.module.css";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const CompleteProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userURL, setUserURL] = useState("");
  
  useEffect(() => {
    const asyncFun = async () => {
      try {
        const resposne = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await resposne.json();
        if (!resposne.ok) {
          throw new Error(data.error.message);
        } else {
          console.log(data);
          setUserName(() => data.users[0].displayName);
          setUserURL(() => data.users[0].photoUrl);
        }
      } catch (error) {
        alert(error);
      }
    };
    asyncFun();
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // const userName = nameRef.current.value;
    // const userURL = photoUrlRef.current.value;
    console.log(userName, userURL);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: userName,
            photoUrl: userURL,
            deleteAttribute: null,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "Application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  const nameChangeHandler = (event) => {
    console.log(event.target.value);
    setUserName(event.target.value);
  };

  const urlChangeHandler = (event) => {
    console.log(event.target.value);
    // setTimeout(() => {
    setUserURL(event.target.value);
    // });
  };
  const redirectHandler = () => {
    // console.log('helllo')
    return history.push("/profile");
  };

  return (
    <div className={classes.container}>
      <div className={classes["header-quote"]}>
        <h2> Winners never quit, quitters never win </h2>
        <h2>
          Your profile is 64% completed. A complete profile has higher chances
          of landing a job
          <span>
            <a href="/complete-profile"> Complete Now</a>
          </span>
        </h2>
      </div>
      <div className={classes.name}>
        <h3>Contact details</h3>
        <button onClick={redirectHandler}>cancel</button>
      </div>
      <div className={classes.details}>
        <form onSubmit={formSubmitHandler}>
          <div className={classes["details-form"]}>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={nameChangeHandler}
              />
            </div>
            <div>
              <label>Profile Phot URL</label>
              <input type="url" value={userURL} onChange={urlChangeHandler} />
            </div>
          </div>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
