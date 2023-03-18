import { useContext, useEffect, useRef, useState } from "react";
import classes from "./CompleteProfile.module.css";
import { AuthContext } from "../components/store/auth-context";

const CompleteProfile = () => {
  const ctx = useContext(AuthContext);
  console.log(ctx);
  const nameRef = useRef();
  const photoUrlRef = useRef();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const asyncFun = async () => {
      const resposne = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.token,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await resposne.json();
      setName(()=>data.users[0].displayName)
      setImage(()=>data.users[0].photoUrl)
    };
    asyncFun();
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const userName = nameRef.current.value;
    const photoUrl = photoUrlRef.current.value;
    console.log(userName, photoUrl);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          displayName: userName,
          photoUrl: photoUrl,
          deleteAttribute: null,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "Application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes["header-quote"]}>
        <h2> Winners never quid, quitters never win </h2>
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
        <button>cancel</button>
      </div>
      <div className={classes.details}>
        <form onSubmit={formSubmitHandler}>
          <div className={classes["details-form"]}>
            <div>
              <label>Full Name</label>
              <input ref={nameRef} type="text" value={name} />
            </div>
            <div>
              <label>Profile Phot URL</label>
              <input ref={photoUrlRef} type="url" value={image} />
            </div>
          </div>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
