import { Link, json, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { nameToUrl, urlToName } from "../../util/convertString";
import classes from "./Novel.module.css";
import { compareTime } from "../../util/dateUtil";
import { useContext, useState } from "react";
import UserContex from "../../context/userContext";

export default function Novel(props) {
  const ct = useContext(UserContex);
  const navigate = useNavigate();
  const data = useLoaderData();
  const [followState, setFollowState] = useState(
    ct.user.followed && ct.user.followed.includes(data._id)
  );
  const showedChapter =
    data.chapters && data.chapters.sort((a, b) => b.chapter - a.chapter);

  const followHandler = () => {
    if (followState) {
      ct.removeFollowed(data._id);
    } else {
      ct.addFollowed(data._id);
    }
    setFollowState(ct.user.followed.includes(data._id));
  };

  return (
    <div className={classes.wp}>
      <div className={classes.path}>
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/search">Novel</Link>
        <span> / </span>
        <Link to={"/novel/" + data.name}>{urlToName(data.name)}</Link>
      </div>
      <div className={classes.detail}>
        <div className={classes.image}>
          <img
            src={`${process.env.REACT_APP_API_KEY}${data.image}`}
            alt="thumb"
          />
        </div>
        <div className={classes.text}>
          <h1>{urlToName(data.name)}</h1>
          <p className={classes.other}>
            Other name: <span>{urlToName(data.other)}</span>
          </p>
          <p className={classes.author}>
            Author: <span>{data.author}</span>
          </p>
          <p className={classes.status}>
            Status: <span>{data.status}</span>
          </p>
          <p className={classes.rating}>
            Rating:{" "}
            <span>{`${data.rating.score}/5 ${data.rating.rated}-rated`}</span>
          </p>
          <p className={classes.total}>
            Total: <span>{data.chapters.length} chapter</span>
          </p>
          <div className={classes.genre}>
            <p>Genre:</p>
            <ul className={classes.genreList}>
              {data.category.map((cat) => (
                <li key={cat}>
                  <Link to={"/search?genre=" + nameToUrl(cat)}>{cat}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.action}>
            <div className={classes.follow}>
              <button onClick={followHandler}>
                {followState ? "Unfollow" : "Follow"}
              </button>
              <span>99 followed</span>
            </div>
            <Link
              className={classes.continue}
              to={`/novel/${data.name}/${showedChapter[0]}`}
            >
              Continue from chapter {showedChapter[0].chapter}
            </Link>
            <Link
              className={classes.start}
              to={`/novel/${data.name}/${
                showedChapter[showedChapter.length - 1]
              }`}
            >
              Read from start
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <h2>Description:</h2>
        <p>{data.description}</p>
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
            {showedChapter.map((c, i) => (
              <tr
                key={i}
                onClick={navigate.bind(
                  null,
                  `/novel/${data.name}/${c.chapter}`
                )}
              >
                <td>{c.chapter}</td>
                <td>{c.title}</td>
                <td>{c.group}</td>
                <td>{c.status}</td>
                <td>{c.viewed}</td>
                <td>{compareTime(new Date(), new Date(c.updatedAt))} ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const novelName = params.novelName;
  return await fetch(`${process.env.REACT_APP_API_KEY}/novel/${novelName}`, {
    method: "GET",
    credentials: "include",
  })
    .then((respon) => {
      if (respon.status === 500)
        throw json("failed to fetch novel detail", 500);
      if(respon.status===202)
        return redirect('/')
      return respon.json();
    })
    .catch((err) => {
      console.error(err);
    });
}
