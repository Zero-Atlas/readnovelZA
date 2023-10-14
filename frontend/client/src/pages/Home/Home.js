import Category from "../../components/Category/Category";
import classes from "./Home.module.css";
import Sidebar from "./Sidebar/Sidebar";

export default function Home() {
  return (
    <div className={classes.wrapper}>
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
    </div>
  );
}