import { Form, NavLink } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <div className={"d-flex " + classes.wp}>
      <a className={classes.logo} href="/">
        ReadNovel
      </a>
      <nav className={"d-flex " + classes.nav}>
        <Form className={classes.search}>
          <input type="text" name="search" placeholder="Enter keyword" />
        </Form>
        <NavLink
          to="/"
          className={({isActive}) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/recent"
          className={({isActive}) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Recent
        </NavLink>
        <NavLink
          to="/profile"
          className={({isActive}) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Profile
        </NavLink>
      </nav>
    </div>
  );
}
