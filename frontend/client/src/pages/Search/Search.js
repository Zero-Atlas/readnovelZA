import { Link, json } from "react-router-dom";
import classes from "./Search.module.css";
import { useEffect, useState } from "react";
import { nameToUrl, urlToName } from "../../util/convertString";

export default function Search() {
  const [result, setResult] = useState([]);
  const [genre, setGenre] = useState("");
  const genreList = ["Action", "Adventure", "Comedy", "Drama"];
  const [sortStyle, setSortStyle] = useState("recent");

  //sort function trigger when sortStyle change
  useEffect(() => {
    setResult((prev) => {
      if (prev)
        prev.sort((a, b) => {
          switch (sortStyle) {
            case "new":
              return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              );
            case "view":
              return a.rating.score - b.rating.score;
            default:
              return (
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
              );
          }
        });
      return prev;
    });
  }, [sortStyle]);

  //search function trigger when genre change
  useEffect(() => {
    //only run when genre is not empty
    if (genre) {
      fetch(
        `${process.env.REACT_APP_API_KEY}/novel/search?genre=${nameToUrl(
          genre
        )}`,
        { method: "GET", credentials: "include" }
      )
        .then((respon) => {
          if (respon.ok) return respon.json();
          throw json("Failed to fetch", 500);
        })
        .then((data) => {
          if (typeof data === "object" && data.length > 0) {
            data.sort(
              (a, b) =>
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
            );
            return setResult(data);
          }
        })
        .then(() => {
          //reset sortStyle
          setSortStyle("recent");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [genre]);

  return (
    <div className={classes.wp}>
      <div className={classes.title}>Novel list</div>
      <div className={classes.grid}>
        <div className={classes.sort}>
          <button
            onClick={setSortStyle.bind(null, "recent")}
            className={classes.recent}
          >
            Recent
          </button>
          <button
            onClick={setSortStyle.bind(null, "new")}
            className={classes.new}
          >
            New
          </button>
          <button
            onClick={setSortStyle.bind(null, "view")}
            className={classes.view}
          >
            View
          </button>
        </div>
        <div className={classes.page}>
          <button className={classes.prev} disabled={true}>
            Previous
          </button>
          <button className={classes.next}>Next</button>
        </div>
        {/* ----------------------Search result------------------------ */}
        <ul className={classes.result}>
          {result.length > 0 &&
            result.map((novel, i) => (
              <li key={i}>
                <Link to={"/novel/" + nameToUrl(novel.name)}>
                  <div className={classes.image}>
                    <img
                      src={`${process.env.REACT_APP_API_KEY}${novel.image}`}
                      alt={novel.name}
                    />
                  </div>
                  <p>{urlToName(novel.name)}</p>
                </Link>
              </li>
            ))}
          {result.length === 0 && (
            <p className={classes.noResult}>There is no novel matched</p>
          )}
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
              {genreList.map((g, i) => (
                <li
                  key={i}
                  onClick={setGenre.bind(null, g)}
                  className={g === genre ? classes.active : undefined}
                >
                  {g}
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  return await fetch(`${process.env.REACT_APP_API_KEY}/novel/category`, {
    method: "GET",
    credentials: "include",
  })
    .then((respon) => {
      if (!respon.ok) throw json("Failed to fetch", 500);
      return respon.json();
    })
    .then((data) => {
      return data.map((cat) => urlToName(cat));
    })
    .catch((err) => {
      console.error(err);
    });
}
