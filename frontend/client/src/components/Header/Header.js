import { Form, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.css";
import { useContext, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import UserContex from "../../context/userContext";
import NameModal from "../NameModal/NameModal";

export default function Header() {
  const ct = useContext(UserContex);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  //name modal control
  const openNameModal = () => {
    setShowNameModal(true);
  };
  const closeNameModal = () => {
    setShowNameModal(false);
  };

  //login modal control
  const openLogin = () => {
    setShowLogin(true);
  };
  const closeLogin = () => {
    setShowLogin(false);
  };

  //profile list control
  const profileOpen = () => {
    setShowProfile(true);
  };
  const profileClose = () => {
    setShowProfile(false);
  };
  return (
    <div className={"d-flex " + classes.wp}>
      <Link className={classes.logo} to="/">
        ReadNovel
      </Link>
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
          onMouseEnter={ct.user.username?profileOpen:()=>{}}
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
        {/* profile list */}
        {showProfile && ct.user.username && (
          <ul className={classes.profileMenu} onMouseLeave={profileClose}>
            <li>
              <p>{ct.user.publicName.name}</p>
            </li>
            <li>
              <p onClick={openNameModal}>Change Name</p>
            </li>
            <li>
              <Link to="/novel/followed">Followed Novel</Link>
            </li>
            <li>
              <Link to="/novel/history">Read History</Link>
            </li>
            <li>
              <p onClick={ct.logout}>Log Out</p>
            </li>
          </ul>
        )}
      </nav>

      {/* login modal */}
      {showLogin && <LoginModal onClose={closeLogin} />}
      {/* name modal */}
      {showNameModal && <NameModal onClose={closeNameModal} />}
    </div>
  );
}
