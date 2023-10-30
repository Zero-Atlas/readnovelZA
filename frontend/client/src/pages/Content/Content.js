import {
  Link,
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { urlToName } from "../../util/convertString";
import classes from "./Content.module.css";
import { useContext, useEffect, useState } from "react";
import UserContex from "../../context/userContext";

export default function Content() {
  const params = useParams();
  const data = useLoaderData();
  const ct = useContext(UserContex);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // update history for logged in user
  if (ct.user.username) {
    ct.editHistory(params.novelName);
  }

  //handler scroll effect for sticky navbar
  const scrollHandler = () => {
    setScrollPosition(window.scrollY);
  };
  window.addEventListener("scroll", scrollHandler);
  useEffect(() => {
    if (scrollPosition > 150) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [scrollPosition]);
  
  // change page handler
  const nextPage = () => {
    navigate(
      "/novel/" + params.novelName + "/" + (Number(params.chapterNo) + 1)
    );
  };
  const prevPage = () => {
    navigate(
      "/novel/" + params.novelName + "/" + (Number(params.chapterNo) - 1)
    );
  };

  return (
    <>
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

      <div className={classes.wp}>
        <nav className={`${classes.sticky} ${expanded && classes.expanded}`}>
          <button
            disabled={Number(params.chapterNo) - 1 <= 0}
            onClick={prevPage}
          >
            Previous Chapter
          </button>
          <Link to={"/novel/" + params.novelName}>List</Link>
          <Link to="/">Home</Link>
          <button
            onClick={nextPage}
          >
            Next Chapter
          </button>
        </nav>
        <div className={classes.content}>
          {data && data.message && data.message}
          {!data && <p>No content</p>}P

          {data && data.content && data.content}
        </div>
        <div className={classes.cta}>
          <button
            disabled={Number(params.chapterNo) - 1 <= 0}
            onClick={prevPage}
          >
            Previous Chapter
          </button>
          <Link to={"/novel/" + params.novelName}>To Chapter List</Link>
          <button
            onClick={nextPage}
          >
            Next Chapter
          </button>
        </div>
      </div>
      <button
        className={classes.top}
        onClick={window.scrollTo.bind(null, 0, 0)}
      >
        top
      </button>
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
      if (respon.status === 202) return redirect("/novel/" + novelName);
      if (!respon.ok) {
        throw json("Failed to fetch", 500);
      }
      return respon.json();
    })
    .catch((err) => {
      console.error(err);
    });
}
