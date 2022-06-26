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
  const isUser = !!localStorage.getItem("token");

  const routes = [
    {
      path: "/",
      element: <MainNavigation isLogIn={isUser} />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "courses", element: <CoursesPage /> },
        isUser && { path: "user-content", element: <UserContentPage /> },
      ],
    },
    !isUser && {
      path: "/login",
      element: <SubNavigation isLogIn={isUser} />,
      children: [
        {
          path: "/login",
          element: <SignInPage />,
        },
      ],
    },
    !isUser && {
      path: "/register",
      element: <SubNavigation isLogIn={isUser} />,
      children: [
        {
          path: "/register",
          element: <SignUpPage />,
        },
      ],
    },
    !isUser && {
      path: "/user-content",
      element: <SecuredPageInfo securedProp="user-content" />,
    },
    { path: "*", element: <NotFoundPage /> },
  ];

  const routing = useRoutes(routes);

  return routing;
};
