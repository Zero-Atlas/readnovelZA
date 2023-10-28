import classes from "./SliderBanner.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SliderBanner(props) {
  const [bannerNo, setBannerNo] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setBannerNo((prev) => {
        if (prev === props.data.length - 1) return 0;
        else return prev + 1;
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, [bannerNo]);

  return (
    <div className={classes.wp}>
      <div className={classes.slideShow}>
        <Link
          to={`/novel/${props.data[bannerNo].name}`}
          className={classes.image}
          style={{
            position: "absolute",
            backgroundImage: `url(${process.env.REACT_APP_API_KEY}${props.data[bannerNo].banner})`,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
          }}
        ></Link>
      </div>
      <ul className={classes.slider}>
        {props.data.map((_, index) => (
          <li
            onClick={setBannerNo.bind(null, index)}
            key={index}
            className={bannerNo === index ? classes.active : undefined}
          ></li>
        ))}
      </ul>
    </div>
  );
}
