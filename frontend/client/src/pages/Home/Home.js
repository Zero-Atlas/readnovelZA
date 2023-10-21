import { Await, defer, useLoaderData } from "react-router";
import Category from "../../components/Category/Category";
import SliderBanner from "../../components/SliderBanner/SliderBanner";
import classes from "./Home.module.css";
import Sidebar from "./Sidebar/Sidebar";
import { Suspense } from "react";

export default function Home() {
  const {
    bannerLoader,
    recentLoader,
    popularLoader,
    newLoader,
    sidebarLoader,
  } = useLoaderData();
  return (
    <div className={classes.wp}>
      <section className={classes.banner}>
        <SliderBanner data={bannerLoader} />
      </section>
      <section className={classes.flex}>
        {/* content */}
        <div className={classes.content}>
          <Category title="Recent Updated" data={recentLoader} />
          <Suspense fallback={"Loading"}>
            <Await resolve={popularLoader}>
              {(popular) => <Category title="Most Popular" data={popular} />}
            </Await>
          </Suspense>
          <Suspense fallback={"Loading"}>
            <Await resolve={newLoader}>
              {(newNovel) => <Category title="New Novel" data={newNovel} />}
            </Await>
          </Suspense>
        </div>

        {/* sidebar */}
        <div className={classes.sidebar}>
          <Sidebar data={sidebarLoader} />
        </div>
      </section>
    </div>
  );
}

// --------------------------loader------------------------------
export async function loader() {
  const [bannerLoader, recentLoader, sidebarLoader] = await Promise.all([
    fetchBanner(),
    fetchRecent(),
    fetchSidebar(),
  ]);
  return defer({
    bannerLoader,
    recentLoader,
    sidebarLoader,
    newLoader: fetchNew(),
    popularLoader: fetchPopular(),
  });
}

async function fetchBanner() {
  const respon = await fetch(`${process.env.REACT_APP_API_KEY}/novel/banner`);
  if (!respon.ok) {
    console.log(respon);
    return [];
  } else {
    return await respon.json();
  }
}
async function fetchRecent() {
  const respon = await fetch(`${process.env.REACT_APP_API_KEY}/novel/recent`);
  if (!respon.ok) {
    console.log(respon);
    return [];
  } else {
    return await respon.json();
  }
}
async function fetchPopular() {
  const respon = await fetch(`${process.env.REACT_APP_API_KEY}/novel/popular`);
  if (!respon.ok) {
    console.log(respon);
    return [];
  } else {
    return await respon.json();
  }
}
async function fetchNew() {
  const respon = await fetch(`${process.env.REACT_APP_API_KEY}/novel/new`);
  if (!respon.ok) {
    console.log(respon);
    return [];
  } else {
    return await respon.json();
  }
}
async function fetchSidebar() {
  const respon = await fetch(`${process.env.REACT_APP_API_KEY}/novel/all`);
  if (!respon.ok) {
    console.log(respon);
    return [];
  } else {
    return await respon.json();
  }
}
