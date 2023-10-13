import { Link, useParams } from "react-router-dom";
import classes from "./Novel.module.css";
import cover from "../../static/cover.jpg";

export default function Novel(props) {
  const params = useParams();
  return (
    <div className={classes.wp}>
      <div className={classes.path}>
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/search">Novel</Link>
        <span> / </span>
        <Link to={"/novel/" + params.novelName}>Novel name</Link>
      </div>
      <div className={classes.detail}>
        <div className={classes.image}>
          <img src={cover} alt="thumb" />
        </div>
        <div className={classes.text}>
          <h1>Novel Name</h1>
          <p className={classes.other}>
            Other name: <span>Other Name</span>
          </p>
          <p className={classes.author}>
            Author: <span>Author Name</span>
          </p>
          <p className={classes.status}>
            Status: <span>Ongoing</span>
          </p>
          <p className={classes.rating}>
            Rating: <span>5/5 185-rated</span>
          </p>
          <p className={classes.total}>
            Total: <span>249 chapter</span>
          </p>
          <div className={classes.genre}>
            <p>Genre:</p>
            <ul className={classes.genreList}>
              <li>
                <Link to="/search?genre=action">Action</Link>
              </li>
              <li><Link to="/search?genre=comedy">Comedy</Link></li>
              <li><Link to="/search?genre=drama">Drama</Link></li>
              <li><Link to="/search?genre=super-nature">Super Nature</Link></li>
            </ul>
          </div>
          <div className={classes.action}>
            <div className={classes.follow}>
              <button>Follow</button>
              <span>2048 follower</span>
            </div>
            <Link className={classes.continue} to="/continue||latest">Continue from chapter 99</Link>
            <Link className={classes.start} to="/start">Read from start</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
