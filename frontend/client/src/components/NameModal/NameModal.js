import { Form } from "react-router-dom";
import classes from "./NameModal.module.css";
import ReactDOM from "react-dom";
import { useContext, useState } from "react";
import UserContex from "../../context/userContext";

const Modal = (props) => {
  const ct = useContext(UserContex);
  const nameRegex = /([\w _]){3,}/g;
  const titleRegex = /([a-zA-Z ]){3,}/g;
  const [publicName, setPublicName] = useState(ct.user.publicName.name);
  const [invalidName, setInvalidName] = useState(false);

  const [title, setTitle] = useState(ct.user.publicName.title);
  const [invalidTitle, setInvalidTitle] = useState(false);

  const invalidInput = invalidTitle || invalidName;

  const publicNameChange = (event) => {
    setPublicName(event.target.value);
    if (nameRegex.test(event.target.value.trim())) setInvalidName(false);
    else setInvalidName(true);
  };
  const titleChange = (event) => {
    setTitle(event.target.value);
    if (titleRegex.test(event.target.value.trim())) setInvalidTitle(false);
    else setInvalidTitle(true);
  };

  //submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    ct.changeName(publicName,title)
  };
  return (
    <div className={classes.modal}>
      <h2>Change Public Name</h2>
      <p className={classes.explain}>
        Your public name will be show as:<br/>
        {`[Public Name] = [Name] + Chicken + [Title]`}
      </p>
      <Form onSubmit={submitHandler}>
        <div className={classes.formControl}>
          <label htmlFor="publicName">Name</label>
          <input
            type="text"
            name="publicName"
            id="publicName"
            value={publicName}
            onChange={publicNameChange}
          />
          {invalidInput && invalidName && (
            <p className={classes.errorInput}>
              Public name only contain word, number, whitespace, underscore and
              atleast have 3 character.
            </p>
          )}
        </div>
        <div className={classes.formControl}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={titleChange}
          />
          {invalidInput && invalidTitle && (
            <p className={classes.errorInput}>
              Title only contain word, whitespace and atleast have 3 character.
            </p>
          )}
        </div>
        <div className={classes.formAction}>
          <button onClick={props.onClose}>Cancel</button>
          <button disabled={invalidName || invalidTitle} type="submit">
            Change
          </button>
        </div>
      </Form>
    </div>
  );
};
const Overlay = (props) => {
  return <div className={classes.overlay} onClick={props.onClose}></div>;
};

export default function NameModal(props) {
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
