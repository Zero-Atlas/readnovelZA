import { Form, json } from "react-router-dom";
import classes from "./LoginModal.module.css";
import ReactDOM from "react-dom";
import { useContext, useState } from "react";
import UserContex from "../../context/userContext";

const Modal = (props) => {
  const userContext=useContext(UserContex)
  const usernameRegex = /(\w){6,}/g;
  const passwordRegex = /[\w!@#$%^&*()]{6,}/g;
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const invalidInput = (invalidPassword || invalidUsername) && isTouch;

  // blur password
  const blurHandler = () => {
    setIsTouch(true);
  };
  //on change input handler
  const usernameChange = (event) => {
    setUsername(event.target.value.trim());
    if (usernameRegex.test(event.target.value.trim()))
      setInvalidUsername(false);
    else setInvalidUsername(true);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value.trim());
    if (passwordRegex.test(event.target.value.trim()))
      setInvalidPassword(false);
    else setInvalidPassword(true);
  };

  //change action handler
  const changeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prev) => !prev);
  };
  const resetInput = () => {
    setUsername("");
    setPassword("");
  };

  //submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    const action = isLogin ? "login" : "register";
    const sendData = {
      username,
      password,
    };
    resetInput();

    await fetch(`${process.env.REACT_APP_API_KEY}/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then(async (respon) => {
        if (!respon.ok) {
          if (respon.status === 500) throw json("Could not " + action, 500);
          else {
            throw await respon.json();
          }
        } else {
          return respon.json();
        }
      })
      .then((data) => {
        if(!data.message) userContext.login(data)
        return props.onClose();
      })
      .catch((err) => {
        if (err.message) setErrorMsg(err.message);
      });
  };

  return (
    <div className={classes.modal}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <Form onSubmit={submitHandler}>
        {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
        <div className={classes.formControl}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={usernameChange}
          />
          {invalidInput && invalidUsername && (
            <p className={classes.errorInput}>
              Username only contain word, number, undersore and atleast have 6
              character.
            </p>
          )}
        </div>
        <div className={classes.formControl}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={passwordChange}
            onBlur={blurHandler}
          />
          {invalidInput && invalidPassword && (
            <p className={classes.errorInput}>
              Password only contain word, number, special character and atleast
              have 6 character.
            </p>
          )}
        </div>
        <div className={classes.formAction}>
          <button onClick={props.onClose}>Cancel</button>
          <button
            disabled={invalidInput || invalidUsername || invalidPassword}
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <button onClick={changeHandler}>
            {!isLogin ? "to Login" : "Register?"}
          </button>
        </div>
      </Form>
    </div>
  );
};
const Overlay = (props) => {
  return <div className={classes.overlay} onClick={props.onClose}></div>;
};

export default function LoginModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Modal onClose={props.onClose} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <Overlay onClose={props.onClose} />,
        document.getElementById("overlay")
      )}
    </>
  );
}
