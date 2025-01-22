import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageLayout } from "@/layout";
import {
  Home,
  Error,
  Index,
  Shop,
  Collection,
  Blog,
  ContactUs,
  Pages,
} from "@/pages";
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
      { path: ROUTES.COLLECTION, element: <Collection /> },
      { path: ROUTES.CONTACT_US, element: <ContactUs /> },
      { path: ROUTES.BLOG, element: <Blog /> },
      { path: ROUTES.PAGES, element: <Pages /> },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
