import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/Home/Home";
import RootLayout from "./layouts/RootLayout";
import Novel, { loader as detailLoader } from "./pages/Novel/Novel";
import Search from "./pages/Search/Search";
import Content, { loader as contentLoader } from "./pages/Content/Content";
import ErrorBoundary from "./pages/Error/ErrorBoundary";
import Follow from "./pages/Follow/Follow";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "/novel/:novelName", element: <Novel />, loader: detailLoader },
      { path: "/novel/follow", element: <Follow /> },
      {
        path: "/novel/:novelName/:chapterNo",
        element: <Content />,
        loader: contentLoader,
      },
      { path: "/search", element: <Search /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
