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
              <li>
                <Link to="/search?genre=comedy">Comedy</Link>
              </li>
              <li>
                <Link to="/search?genre=drama">Drama</Link>
              </li>
              <li>
                <Link to="/search?genre=super-nature">Super Nature</Link>
              </li>
            </ul>
          </div>
          <div className={classes.action}>
            <div className={classes.follow}>
              <button>Follow</button>
              <span>2048 follower</span>
            </div>
            <Link className={classes.continue} to="/continue||latest">
              Continue from chapter 99
            </Link>
            <Link className={classes.start} to="/start">
              Read from start
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <h2>Description:</h2>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </p>
      </div>
      <div className={classes.chapters}>
        <h2>Chapter list:</h2>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.chapter}>Chapter</th>
              <th className={classes.title}>Title</th>
              <th className={classes.group}>Translate Group</th>
              <th className={classes.status}>Status</th>
              <th className={classes.viewed}>Viewed</th>
              <th className={classes.updated}>Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>N/A</td>
              <td></td>
              <td>avalable</td>
              <td>0</td>
              <td>3 hours ago</td>
            </tr>
            <tr>
              <td>1</td>
              <td>N/A</td>
              <td></td>
              <td>avalable</td>
              <td>214</td>
              <td>18 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
