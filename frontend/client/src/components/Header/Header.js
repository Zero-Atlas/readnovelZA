import { Form, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../static/logo2.png";
import classes from "./Header.module.css";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const userId = "";

  //login modal control
  const loginClick = () => {
    setShowLogin(true);
  };
  const closeLogin = () => {
    setShowLogin(false);
  };

  //profile list control
  const hoverIn = () => {
    setShowProfile(true);
  };
  const hoverOut = () => {
    setShowProfile(false);
  };
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
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Search
        </NavLink>
        <div
          className={classes.profile}
          onBlur={hoverOut}
          onFocus={hoverIn}
          // only usable when not logged in
          onClick={!userId ? loginClick : () => {}}
          // user avatar
          style={
            userId
              ? {
                  backgroundImage: `url(${logo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "4rem",
                  height: "4rem",
                }
              : {}
          }
        >
          {/* placeholder icon while not logged in */}
          {!userId && <FontAwesomeIcon icon="fa-solid fa-user" />}
        </div>
      </nav>
      {/* profile list */}
      {showProfile && (
        <ul className={classes.profileMenu}>
          <li>Public Name</li>
          <li>Change Name</li>
          <li>Followed Novel</li>
          <li>Read Novel</li>
          <li>Log Out</li>
        </ul>
      )}

      {/* login modal */}
      {showLogin && <LoginModal onClose={closeLogin} />}
    </div>
  );
}
