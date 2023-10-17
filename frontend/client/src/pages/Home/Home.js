import Category from "../../components/Category/Category";
import SliderBanner from "../../components/SliderBanner/SliderBanner";
import classes from "./Home.module.css";
import Sidebar from "./Sidebar/Sidebar";

export default function Home() {
  return (
    <div className={classes.wp}>
      <section className={classes.banner}>
        <SliderBanner/>
      </section>
      <section className={classes.flex}>
        {/* content */}
        <div className={classes.content}>
          <Category title="Recent Updated" />
          <Category title="Recent Read Related" />
          <Category title="New Novel" />
        </div>

        {/* sidebar */}
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
      </section>
    </div>
  );
}
