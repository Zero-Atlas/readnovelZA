import { Link, useLoaderData, useParams } from "react-router-dom";
import { urlToName } from "../../util/convertString";
import classes from "./Content.module.css";

export default function Content() {
  const params = useParams();
  const data = useLoaderData();
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
          {data&&data.message&&data.message}
          {!data&&<p>No content</p>}
          
          {data&&data.content&&data.content}
        </div>
      </div>
    </>
  );
}

export async function loader({ params }) {
  const novelName = params.novelName;
  const chapterNo = params.chapterNo;
  const respon = await fetch(
    `${process.env.REACT_APP_API_KEY}/novel/${novelName}/${chapterNo}`
  );
  if (!respon.ok) {
    console.log(respon);
    return null;
  }
  const data = await respon.json();
  return data;
}
