import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import RootLayout from "./layouts/RootLayout";
import Novel from "./pages/Novel/Novel";
import Search from "./pages/Search/Search";
import Content, { loader as contentLoader } from "./pages/Content/Content";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/novel/:novelName", element: <Novel /> },
      { path: "/novel/:novelName/:chapterNo", element: <Content />,loader:contentLoader },
      { path: "/search", element: <Search /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
