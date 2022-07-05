import { useRoutes } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  SecuredContentPage,
  CoursesPage,
  UserDataPage,
  UsersPage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
  SecuredPageInfo,
} from "pages";
import { MainNavigation } from "components/Navigation";
import { PersistLogin } from "PersistLogin";
import { RequireAuth } from "RequireAuth";

const { REACT_APP_ADMIN, REACT_APP_EDITOR, REACT_APP_USER } = process.env;

const ROLES = {
  Admin: +REACT_APP_ADMIN,
  Editor: +REACT_APP_EDITOR,
  User: +REACT_APP_USER,
};

export const RoutesApp = () => {
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
                },
                {
                  path: "secure-content/courses",
                  element: <CoursesPage />,
                },
                {
                  path: "secure-content/data",
                  element: <UserDataPage />,
                },
                {
                  element: <RequireAuth allowedRoles={[ROLES.Admin]} />,
                  children: [
                    { path: "secure-content/users", element: <UsersPage /> },
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
