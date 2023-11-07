import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useContext } from "react";
import UserContex from "../../context/userContext";

export default function Navbar() {
  const ct = useContext(UserContex);
  return (
    <ul className={classes.navbar}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Posted Novel
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-novel"
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Add Novel
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/edit-novel"
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Edit Novel
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/new-chapter"
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          New Chapter
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/level"
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Level Request
        </NavLink>
      </li>
      {ct.user.username && (
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive
                ? classes.active + " " + classes.navLink
                : classes.navLink
            }
          >
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
}
