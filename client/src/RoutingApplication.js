import { useRoutes } from "react-router-dom";

import { SignInPage, SignUpPage } from "pages";
import { HomePage } from "pages/HomePage";

import { AboutPage } from "pages/AboutPage";
import { CoursesPage } from "pages/CoursesPage";
import { MainNavigation, SubNavigation } from "components/Navigation";

export const RoutesApplication = () => {
  const routes = [
    {
      path: "/",
      element: <MainNavigation />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/courses", element: <CoursesPage /> },
      ],
    },
    {
      path: "/login",
      element: <SubNavigation />,
      children: [
        {
          path: "/login",
          element: <SignInPage />,
        },
      ],
    },
    {
      path: "/register",
      element: <SubNavigation />,
      children: [
        {
          path: "/register",
          element: <SignUpPage />,
        },
      ],
    },
  ];

  const routing = useRoutes(routes);

  return routing;
};
