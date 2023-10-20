import classes from "./Sidebar.module.css";
import SidebarList from "./SidebarList";

export default function Sidebar(props) {
  const followed = props.data.filter((novel, index) => index < 4);
  const recent = props.data.filter((novel, index) => index < 4);
  const rating = props.data.sort((a, b) => b.rating.score - a.rating.score).slice(0,10);
  return (
    <div className={classes.wp}>
      <div className={classes.followed}>
        <div className={classes.listName}>Followed</div>
        <SidebarList data={followed} />
      </div>
      <div className={classes.recent}>
        <div className={classes.listName}>Recently read</div>
        <SidebarList data={recent} />
      </div>
      <div className={classes.most}>
        <div className={classes.listName}>Most Rating</div>
        <SidebarList data={rating} />
      </div>
    </div>
  );
}
