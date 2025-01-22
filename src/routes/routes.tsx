import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageLayout } from "../layout";
import { Home, Error, Index, Shop } from "../pages";
import { ROUTES } from "./constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.SHOP, element: <Shop /> },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
