import { Outlet, useRoutes } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  SecuredContentPage,
  CoursesPage,
  UsersPage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
  SecuredPageInfo,
  CreateEmployee,
} from "pages";
import { MainNavigation, SubNavigation } from "components/Navigation";
import { PersistLogin } from "PersistLogin";
import { RequireAuth } from "RequireAuth";
import EmployeesDataPage from "pages/EmployeesDataPage";
import UpdateEmployee from "pages/UpdateEmployee";

// const { REACT_APP_ADMIN, REACT_APP_EDITOR, REACT_APP_USER } = process.env;

// const ROLES = {
//   Admin: +REACT_APP_ADMIN,
//   Editor: +REACT_APP_EDITOR,
//   User: +REACT_APP_USER,
// };
const ROLES = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
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
                  path: "/",

                  element: <SubNavigation allowedRoles={[ROLES.Admin]} />,
                  children: [
                    {
                      path: "/secure-content",
                      element: <SecuredContentPage />,
                    },
                    {
                      path: "/courses",
                      element: <CoursesPage />,
                    },
                    {
                      path: "/data",
                      element: (
                        <EmployeesDataPage allowedRoles={[ROLES.Admin]} />
                      ),
                    },
                    {
                      path: "/create-employee",
                      element: <CreateEmployee allowedRoles={[ROLES.Admin]} />,
                    },
                    {
                      path: "/update-employee/:id",
                      element: <UpdateEmployee allowedRoles={[ROLES.Admin]} />,
                    },
                    {
                      element: <RequireAuth allowedRoles={[ROLES.Admin]} />,
                      children: [
                        {
                          path: "/users",
                          element: <UsersPage />,
                        },
                      ],
                    },
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
