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
  AdminPage,
} from "pages";

import { MainNavigation } from "components/Navigation";
import { PersistLogin } from "PersistLogin";
import { RequireAuth } from "RequireAuth";

export const RoutesApp = () => {
  const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
  };

  const routes = [
    {
      path: "/",
      element: <MainNavigation />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "register", element: <SignUpPage /> },
        { path: "unauthorized", element: <SecuredPageInfo /> },
        { path: "login", element: <SignInPage /> },
        {
          element: <PersistLogin />,
          children: [
            {
              element: <RequireAuth allowedRoles={[ROLES.User]} />,
              children: [
                {
                  path: "user-content",
                  element: <UserContentPage allowedRoles={[ROLES.Admin]} />,
                },
                {
                  path: "user-content/courses",
                  element: <CoursesPage />,
                },
              ],
            },
            {
              element: <RequireAuth allowedRoles={[ROLES.Admin]} />,
              children: [
                { path: "/user-content/admin", element: <AdminPage /> },
              ],
            },
          ],
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ];

  const routing = useRoutes(routes);

  return routing;
};
