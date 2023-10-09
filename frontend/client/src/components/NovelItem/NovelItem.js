import {Link} from 'react-router-dom'
import classes from "./NovelItem.module.css";

export default function NovelItem(props) {
  return (
    <li className={classes.listItem}>
      <Link to="/novellink" className={classes.image}>
        <img src="/imagelink" alt="desc" />
      </Link>
      <a href="/novellink" className={classes.title}>
        novelname
      </a>
      <div className={classes.chapter}>
        <p>Chapter</p>
        <Link to="/latestchapter">newest</Link>
        <Link to="/2ndlatestchapter">2nd new</Link>
      </div>
    </li>
  );
}
