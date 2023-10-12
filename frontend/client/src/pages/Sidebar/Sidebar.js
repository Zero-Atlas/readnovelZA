import classes from "./Sidebar.module.css";
import SidebarList from "./SidebarList";

export default function Sidebar() {
  return (
    <div className={classes.wp}>
      <div className={classes.followed}>
        <div className={classes.listName}>Followed</div>
        <SidebarList/>
      </div>
      <div className={classes.recent}>
        <div className={classes.listName}>Recently read</div>
        <SidebarList/>
      </div>
      <div className={classes.most}>
        <div className={classes.listName}>Most Rating</div>
        <SidebarList/>
      </div>
    </div>
  );
}
