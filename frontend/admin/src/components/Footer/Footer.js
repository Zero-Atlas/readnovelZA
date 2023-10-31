import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={classes.wp}>
      <div className={classes.textbox}>
        <p>Copyright © 2023 - Readnovel</p>
        <p>Email: readnovelza@gmail.com</p>
        <p>
          <a href="/facebook">Facebook</a>||
          <a href="/privatePolicy">Private Policy</a>
        </p>
      </div>
      <div className={classes.facebook}></div>
    </div>
  );
}
