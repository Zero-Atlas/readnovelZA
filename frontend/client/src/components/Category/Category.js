import { useState } from "react";
import classes from "./Category.module.css";
import NovelItem from "../NovelItem/NovelItem";
import { Link } from "react-router-dom";

export default function Category(props) {
  const [showed, setShowed] = useState(true);

  const showCatHandler = () => {
    setShowed((prev) => !prev);
  };

  return (
    <article className={classes.wp}>
      <button className={classes.title} onClick={showCatHandler}>
        {props.title}
      </button>
      {showed && (
        <>
          <ul className={classes.novelList}>
            <NovelItem />
            <NovelItem />
            <NovelItem />
            <NovelItem />
            <NovelItem />
            <NovelItem />
          </ul>
          <Link to='/this-cat' className={classes.more}>See more</Link>
        </>
      )}
    </article>
  );
}
