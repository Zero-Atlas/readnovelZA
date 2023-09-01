import { Outlet } from "react-router";
import Header from "../components/Header/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
