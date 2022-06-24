import { useRoutes, useNavigate } from "react-router-dom";
import {
  CoursesPage,
  AboutPage,
  SignInPage,
  SignUpPage,
  UserContentPage,
  NotFoundPage,
  HomePage,
} from "pages";

import { MainNavigation, SubNavigation } from "components/Navigation";

export const RoutesApplication = () => {
  const navigate = useNavigate();
  const isUser = !!localStorage.getItem("token");

  const routes = [
    {
      path: "/",
      element: <MainNavigation isLogIn={isUser} />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/courses", element: <CoursesPage /> },
        isUser && { path: "/user-content", element: <UserContentPage /> },
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
    isUser && {
      path: "/user-content",
      element: <SubNavigation isLogIn={isUser} />,
      children: [
        {
          path: "/user-content",
          element: <UserContentPage />,
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ];

  const routing = useRoutes(routes);

  return routing;
};
