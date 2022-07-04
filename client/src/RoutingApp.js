import { useRoutes } from "react-router-dom";
import {
  HomePage,
  CoursesPage,
  UserDataPage,
  AboutPage,
  SignInPage,
  SignUpPage,
  SecuredContentPage,
  NotFoundPage,
  SecuredPageInfo,
  UsersPage,
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
              element: <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />,
              children: [
                {
                  path: "secure-content",
                  element: <SecuredContentPage allowedRoles={[ROLES.Admin]} />,
                  children: [
                    {
                      path: "/secure-content/courses",
                      element: <CoursesPage />,
                    },
                    {
                      path: "data",
                      element: <UserDataPage />,
                    },
                  ],
                },
                {
                  element: <RequireAuth allowedRoles={[ROLES.Admin]} />,
                  children: [
                    { path: "/secure-content/users", element: <UsersPage /> },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ];

  return useRoutes(routes);
};
