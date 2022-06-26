import { Link, NavLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { AiTwotoneHome } from "react-icons/ai";
import {
  MdOutlineCastForEducation,
  MdOutlineDescription,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";

import { styles, useStyles } from "./styles.js";

import { useSetProgressBar } from "useSetProgressBar";
import { NavLogo } from "../NavLogo";
import { Drawer } from "../Drawer";
import { LoadingBarPage } from "components/LoadingBarPage";
import SignInLink from "components/Navigation/SignInLink/SignInLink.js";
import SignUpLink from "components/Navigation/SignUpLink/SignUpLink.js";

const MainNavigation = () => {
  const { progress, setProgress } = useSetProgressBar();

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <LoadingBarPage progress={progress} setProgress={setProgress} />
      <AppBar position="static" className={classes.appBar}>
        <CssBaseline />
        <Toolbar className={classes.toolbar}>
          <Link to="/" style={styles.link}>
            <NavLogo />
          </Link>

          {isMobile ? (
            <Drawer />
          ) : (
            <nav style={styles.navContainer}>
              <div style={styles.linksContainer}>
                <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                >
                  <AiTwotoneHome style={styles.linkIcon} />
                  Home
                </NavLink>
                <NavLink
                  to="/courses"
                  style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                  onClick={() => setProgress(100)}
                >
                  <MdOutlineCastForEducation style={styles.linkIcon} />
                  Courses
                </NavLink>
                <NavLink
                  to="/about"
                  style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                  onClick={() => setProgress(100)}
                >
                  <MdOutlineDescription style={styles.linkIcon} />
                  About
                </NavLink>
                <NavLink
                  to="/user-content"
                  style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                  onClick={() => setProgress(100)}
                >
                  <FiUser style={styles.linkIcon} />
                  For you
                </NavLink>
              </div>

              {/* <LogInOut isLogin={isLogIn} onClick={() => setProgress(100)} /> */}
              <div style={styles.signLinks}>
                <SignInLink />
                <SignUpLink />
              </div>
            </nav>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default MainNavigation;
