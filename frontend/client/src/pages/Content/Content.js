import { Link, json, useLoaderData, useParams } from "react-router-dom";
import { urlToName } from "../../util/convertString";
import classes from "./Content.module.css";
import { useContext } from "react";
import UserContex from "../../context/userContext";

export default function Content() {
  const params = useParams();
  const data = useLoaderData();
  const ct = useContext(UserContex);
  if (ct.user.username) {
    ct.editHistory(params.novelName);
  }
  return (
    <>
      <div className={classes.wp}>
        <div className={classes.path}>
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/search">Novel</Link>
          <span> / </span>
          <Link to={"/novel/" + params.novelName}>
            {urlToName(params.novelName)}
          </Link>
          <span> / </span>
          <Link to={"/novel/" + params.novelName + "/" + params.chapterNo}>
            Chapter {params.chapterNo}
          </Link>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.wp}>
          {data && data.message && data.message}
          {!data && <p>No content</p>}

          {data && data.content && data.content}
        </div>
      </div>
    </>
  );
}

export async function loader({ params }) {
  const novelName = params.novelName;
  const chapterNo = params.chapterNo;
  return await fetch(
    `${process.env.REACT_APP_API_KEY}/novel/${novelName}/${chapterNo}`,
    { method: "GET", credentials: "include" }
  )
    .then((respon) => {
      if (!respon.ok) {
        throw json("Failed to fetch", 500);
      }
      return respon.json();
    })
    .catch((err) => {
      console.error(err);
    });
}
