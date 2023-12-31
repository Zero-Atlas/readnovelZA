import { useEffect, useState } from "react";
import classes from "./Follow.module.css";
import NovelItem from "../../components/NovelItem/NovelItem";
import { json } from "react-router";
import { Link } from "react-router-dom";

export default function Followed() {
  const [followed, setFollowed] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}/user/followed`, {
      method: "GET",
      credentials: "include",
    })
      .then((respon) => {
        if (!respon.ok && respon.status !== 401) {
          throw json("Failed to fetch", 500);
        }
        return respon.json();
      })
      .then((data) => {
        if (data.message) {
          setMsg(data.message);
        } else {
          setMsg("");
          setFollowed(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className={classes.wp}>
      <div className={classes.path}>
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/search">Novel</Link>
        <span> / </span>
        <Link to="/novel/followed">Followed</Link>
      </div>
      {followed.length > 0 && (
        <ul className={classes.novelList}>
          {followed.map((novel, i) => (
            <NovelItem key={i} data={novel} />
          ))}
        </ul>
      )}
      {followed.length === 0 && <p className={classes.msg}>{msg}</p>}
    </div>
  );
}
