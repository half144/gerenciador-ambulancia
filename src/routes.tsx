import { createBrowserRouter } from "react-router";

import { Dashboard } from "./pages/dashboard";
import { Ambulancias } from "./pages/ambulancias";
import Layout from "./components/core/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/ambulancias",
        element: <Ambulancias />,
      },
    ],
  },
]);
