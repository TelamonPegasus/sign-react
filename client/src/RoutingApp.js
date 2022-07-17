import { useRoutes } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  SecuredContentPage,
  CoursesPage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
  SecuredPageInfo,
  CreateEmployee,
  EmployeesDataPage,
  UpdateEmployee,
  SubscribersDataPage,
  UpdateSubscriber,
} from "pages";
import { MainNavigation, SubNavigation } from "components/Navigation";
import { PersistLogin } from "PersistLogin";
import { RequireAuth } from "RequireAuth";

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
              element: (
                <RequireAuth
                  allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]}
                />
              ),
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
                      path: "/employees",
                      element: (
                        <EmployeesDataPage
                          allowedRoles={[ROLES.Admin, ROLES.Editor]}
                        />
                      ),
                    },
                    {
                      path: "/create-employee",
                      element: <CreateEmployee />,
                    },
                    {
                      path: "/update-employee/:id",
                      element: <UpdateEmployee />,
                    },
                    {
                      element: <RequireAuth allowedRoles={[ROLES.Admin]} />,
                      children: [
                        {
                          path: "/subscribers",
                          element: (
                            <SubscribersDataPage allowedRoles={[ROLES.Admin]} />
                          ),
                        },
                        {
                          path: "/update-subscriber/:id",
                          element: (
                            <UpdateSubscriber allowedRoles={[ROLES.Admin]} />
                          ),
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
