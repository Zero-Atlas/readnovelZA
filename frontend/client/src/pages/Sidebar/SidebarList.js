import classes from "./Sidebar.module.css";
import cover from "../../static/cover.jpg";
import { Link } from "react-router-dom";

export default function SidebarList() {
  return (
    <ul className={classes.list}>
      <li className={classes.listItem}>
        <Link to='/detail'>
          <div className={classes.image}>
            <img src={cover} alt="alter" />
          </div>
          <div className={classes.detail}>
            <p>
              Novel Name
            </p>
            <p>Chapter 101</p>
          </div>
        </Link>
      </li>
      <li className={classes.listItem}>
        <Link to='/detail'>
          <div className={classes.image}>
            <img src={cover} alt="alter" />
          </div>
          <div className={classes.detail}>
            <p>
              Novel Name
            </p>
            <p>Chapter 101</p>
          </div>
        </Link>
      </li>
      <li className={classes.listItem}>
        <Link to='/detail'>
          <div className={classes.image}>
            <img src={cover} alt="alter" />
          </div>
          <div className={classes.detail}>
            <p>
              Novel Name
            </p>
            <p>Chapter 101</p>
          </div>
        </Link>
      </li>
    </ul>
  );
}
