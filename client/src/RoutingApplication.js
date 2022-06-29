import { useRoutes } from "react-router-dom";
import {
  HomePage,
  CoursesPage,
  AboutPage,
  SignInPage,
  SignUpPage,
  UserContentPage,
  NotFoundPage,
  SecuredPageInfo,
} from "pages";

import { MainNavigation, SubNavigation } from "components/Navigation";

export const RoutesApplication = () => {
  const routes = [
    {
      path: "/",
      element: <MainNavigation />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "courses", element: <CoursesPage /> },
        { path: "user-content", element: <UserContentPage /> },
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
    {
      path: "/user-content",
      element: <SecuredPageInfo securedProp="user-content" />,
    },
    { path: "*", element: <NotFoundPage /> },
  ];

  const routing = useRoutes(routes);

  return routing;
};
