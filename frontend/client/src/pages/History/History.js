import { useEffect, useState } from "react";
import classes from "./History.module.css";
import NovelItem from "../../components/NovelItem/NovelItem";
import { json } from "react-router";
import { Link } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}/user/history`, {
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
          setHistory(data);
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
        <Link to="/novel/history">History</Link>
      </div>
      {history.length > 0 && (
        <ul className={classes.novelList}>
          {history.map((novel, i) => (
            <NovelItem key={i} data={novel} />
          ))}
        </ul>
      )}
      {history.length === 0 && <p className={classes.msg}>{msg}</p>}
    </div>
  );
}
