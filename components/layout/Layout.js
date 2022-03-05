import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import Link from "next/link";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      {/* <section className={classes.link}>
        {"<<"}
        <Link className={classes.link} href="/">
          Back
        </Link>
      </section> */}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
