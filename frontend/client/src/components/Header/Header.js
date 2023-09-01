import { Form } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <div className={"d-flex " + classes.wp}>
      <div className={classes.logo}>Logo</div>
      <nav className={"d-flex " + classes.nav}>
        <Form className={classes.search}>
          <input type="text" name="search" placeholder="Novel name?" />
        </Form>
        <button className={classes.notify}>Notify</button>
        <button className={classes.user}>Avatar</button>
      </nav>
    </div>
  );
}
