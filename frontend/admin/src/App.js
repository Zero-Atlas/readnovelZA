import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorBoundary from "./pages/Error/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
