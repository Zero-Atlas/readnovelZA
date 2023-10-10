import {Link} from 'react-router-dom'
import classes from "./NovelItem.module.css";
import cover from '../../static/cover.jpg'

export default function NovelItem(props) {
  return (
    <li className={classes.listItem}>
      <Link to="/novellink" className={classes.image}>
        <img src={cover} alt="desc" />
      </Link>
      <a href="/novellink" className={classes.title}>
        novelname
      </a>
      <div className={classes.chapter}>
        <p>Chapter</p>
        <Link to="/latestchapter">101</Link>
        <Link to="/2ndlatestchapter">100</Link>
      </div>
    </li>
  );
}
