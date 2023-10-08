import { useState } from "react";
import classes from "./Category.module.css";

export default function Category(props) {
  const [showed, setShowed] = useState(true);
  return (
    <article className={classes.wp}>
      <button className={classes.title}>{props.title}</button>
      {showed && (
        <ul className={classes.novelList}>
          <li className={classes.listItem}></li>
        </ul>
      )}
    </article>
  );
}
