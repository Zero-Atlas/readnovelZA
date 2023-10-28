import classes from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function SidebarList(props) {
  const navigate = useNavigate();
  return (
    <ul className={classes.list}>
      {props.data.map((novel, index) => (
        <li key={index} className={classes.listItem}>
          <div>
            <div
              className={classes.image}
              onClick={navigate.bind(null, `/novel/${novel.name}`)}
            >
              <img src={`${process.env.REACT_APP_API_KEY}${novel.image}`} alt="alter" />
            </div>
            <div className={classes.detail}>
              <p onClick={navigate.bind(null, `/novel/${novel.name}`)}>
                {novel.name}
              </p>
              <Link
                to={`/novel/${novel.name}/${
                  novel.chapters[novel.chapters.length - 1].chapter
                }`}
              >
                Chapter {novel.chapters[novel.chapters.length - 1].chapter}
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
