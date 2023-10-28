import { Link } from "react-router-dom";
import classes from "./NovelItem.module.css";

export default function NovelItem(props) {
  const latest = [props.data.chapters[props.data.chapters.length - 1].chapter];
  if (props.data.chapters.length > 1)
    latest.push(props.data.chapters[props.data.chapters.length - 2].chapter);
  return (
    <li className={classes.listItem}>
      <Link to={`/novel/${props.data.name}`} className={classes.image}>
        <img src={`${process.env.REACT_APP_API_KEY}${props.data.image}`} alt={props.data.name} />
      </Link>
      <Link to={`/novel/${props.data.name}`} className={classes.title}>
        {props.data.name}
      </Link>
      <div className={classes.chapter}>
        <p>Chapter</p>
        <Link to={`/novel/${props.data.name}/${latest[0]}`}>{latest[0]}</Link>
        {latest.length > 1 && (
          <Link to={`/novel/${props.data.name}/${latest[1]}`}>{latest[1]}</Link>
        )}
      </div>
    </li>
  );
}
