import classes from "./SliderBanner.module.css";
import banner from "../../static/banner.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SliderBanner() {
  const [bannerNo, setBannerNo] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setBannerNo((prev) => {
        if (prev === 6) return 0;
        else return prev + 1;
      });
    }, 4000);
  }, [bannerNo]);
  return (
    <div className={classes.wp}>
      <div className={classes.slideShow}>
        <Link to='/novel/novel-name'
          className={classes.image}
          style={{
            position: "absolute",
            backgroundImage: `url(${banner})`,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
          }}
        ></Link>
      </div>
      <ul className={classes.slider}>
        <li className={bannerNo === 0 ? classes.active:undefined}></li>
        <li className={bannerNo === 1 ? classes.active:undefined}></li>
        <li className={bannerNo === 2 ? classes.active:undefined}></li>
        <li className={bannerNo === 3 ? classes.active:undefined}></li>
        <li className={bannerNo === 4 ? classes.active:undefined}></li>
        <li className={bannerNo === 5 ? classes.active:undefined}></li>
        <li className={bannerNo === 6 ? classes.active:undefined}></li>
      </ul>
    </div>
  );
}
