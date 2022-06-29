import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { RoutesApplication } from "RoutingApplication";
import { Route, Routes } from "react-router-dom";
import { LayoutContainer } from "components/LayoutContainer";
import {
  NotFoundPage,
  SecuredPageInfo,
  SignInPage,
  SignUpPage,
  HomePage,
  UserContentPage,
  AboutPage,
  CoursesPage,
  AdminPage,
} from "pages";
import RequireAuth from "RequireAuth";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const App = () => {
  return (
    <>
      {/* <RoutesApplication />; */}

      <Routes>
        <Route path="/" element={<LayoutContainer />}>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="register" element={<SignUpPage />} />
          <Route path="unauthorized" element={<SecuredPageInfo />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="user-content" element={<UserContentPage />} />
            <Route path="user-content/courses" element={<CoursesPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
