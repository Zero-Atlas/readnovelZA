import { Outlet, useLocation } from "react-router";
import Header from "../components/Header/Header";
import classes from "./RootLayout.module.css";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";

export default function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
