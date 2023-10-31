import { Outlet, json, useLocation } from "react-router";
import Header from "../components/Header/Header";
import classes from "./RootLayout.module.css";
import Footer from "../components/Footer/Footer";
import { useContext, useEffect } from "react";
import UserContex from "../context/userContext";

export default function RootLayout() {
  const ct = useContext(UserContex);
  const { pathname } = useLocation();

  //effect roll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  //load user if already login
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}/auth/get-user-info`, {
      method: "GET",
      credentials: "include",
    })
      .then((respon) => {
        if (!respon.ok) throw json("Failed to fetch", 500);

        return respon.json();
      })
      .then((data) => {
        if (!data.message) ct.login(data);
      });
  }, [ct]);
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
