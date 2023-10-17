import { Link } from "react-router-dom";
import classes from "./Search.module.css";
import cover from "../../static/cover.jpg";

export default function Search() {
  return (
    <div className={classes.wp}>
      <div className={classes.title}>Novel list</div>
      <div className={classes.grid}>
        <div className={classes.sort}>
          <button className={classes.recent}>Recent</button>
          <button className={classes.new}>New</button>
          <button className={classes.view}>View</button>
        </div>
        <div className={classes.page}>
          <button className={classes.prev} disabled={true}>
            Previous
          </button>
          <button className={classes.next}>Next</button>
        </div>
        {/* ----------------------Search result------------------------ */}
        <ul className={classes.result}>
          <li>
            <Link to="/novel/novel-name">
              <div className={classes.image}>
                <img src={cover} alt="novel-name" />
              </div>
              <p>Novel Name</p>
            </Link>
          </li>
          <li>
            <Link to="/novel/novel-name">
              <div className={classes.image}>
                <img src={cover} alt="novel-name" />
              </div>
              <p>Novel Name</p>
            </Link>
          </li>
          <li>
            <Link to="/novel/novel-name">
              <div className={classes.image}>
                <img src={cover} alt="novel-name" />
              </div>
              <p>Novel Name</p>
            </Link>
          </li>
          <li>
            <Link to="/novel/novel-name">
              <div className={classes.image}>
                <img src={cover} alt="novel-name" />
              </div>
              <p>Novel Name</p>
            </Link>
          </li>
          <li>
            <Link to="/novel/novel-name">
              <div className={classes.image}>
                <img src={cover} alt="novel-name" />
              </div>
              <p>Novel Name</p>
            </Link>
          </li>
          <li>
            <Link to="/novel/novel-name">
              <div className={classes.image}>
                <img src={cover} alt="novel-name" />
              </div>
              <p>Novel Name</p>
            </Link>
          </li>
        </ul>
        <div className={classes.page}>
          <button className={classes.prev} disabled={true}>
            Previous
          </button>
          <button className={classes.next}>Next</button>
        </div>
        {/* -----------------------Genre field------------------------- */}
        <div className={classes.genre}>
          <fieldset>
            <legend>Genre</legend>
            <ul className={classes.category}>
              <li className={classes.active}>Action1</li>
              <li>Adventure2</li>
              <li>Comedy3</li>
              <li>Drama4</li>
              <li>Romatic</li>
              <li>Action</li>
              <li>Adventure</li>
              <li>Comedy</li>
              <li>Drama</li>
              <li>Romatic</li>
              <li>Action</li>
              <li>Adventure</li>
              <li>Comedy</li>
              <li>Drama</li>
              <li>Romatic</li>
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
