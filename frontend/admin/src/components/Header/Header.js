import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.css";
import { useContext, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import UserContex from "../../context/userContext";

export default function Header() {
  const ct = useContext(UserContex);
  const [showLogin, setShowLogin] = useState(false);


  //login modal control
  const openLogin = () => {
    setShowLogin(true);
  };
  const closeLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className={"d-flex " + classes.wp}>
      <div className={classes.logo}>Admin</div>
      <nav className={"d-flex " + classes.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? classes.active + " " + classes.navLink : classes.navLink
          }
        >
          Dashboard
        </NavLink>
        <div
          className={classes.profile}
          // only usable when not logged in
          onClick={!ct.user.username ? openLogin : () => {}}
          // user avatar
          style={
            ct.user.username
              ? {
                  backgroundImage: `url(${
                    process.env.REACT_APP_API_KEY + ct.user.avatar
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "4rem",
                  height: "4rem",
                }
              : {}
          }
        >
          {/* placeholder icon while not logged in */}
          {!ct.user._id && <FontAwesomeIcon icon="fa-solid fa-user" />}
        </div>
        
      </nav>

      {/* login modal */}
      {showLogin && <LoginModal onClose={closeLogin} />}
      {/* name modal */}
    </div>
  );
}
