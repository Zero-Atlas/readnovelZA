import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import classes from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.body}>
        <Outlet />
      </div>
      <div className={classes.footer}></div>
    </div>
  );
}