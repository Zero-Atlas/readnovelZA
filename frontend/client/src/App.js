import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import RootLayout from "./layouts/RootLayout";
import Novel from "./pages/Novel/Novel";
import Search from "./pages/Search/Search";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/novel/:novelName", element: <Novel /> },
      { path: "/search", element: <Search /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
