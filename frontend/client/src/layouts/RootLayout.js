import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import classes from "./RootLayout.module.css";
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Header />
      </div>
      <main className={classes.body}>
        <Outlet />
      </main>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}
