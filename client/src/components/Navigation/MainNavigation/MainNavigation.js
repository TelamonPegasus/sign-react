import { Link, NavLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { AiTwotoneHome } from "react-icons/ai";
import { MdOutlineDescription } from "react-icons/md";
import { FiUser } from "react-icons/fi";

import { styles, useStyles } from "./styles.js";

import { useAuthContext } from "context/AuthProvider.js";
import { useSetProgressBar } from "customHooks";

import { LoadingBarPage } from "components/LoadingBarPage";
import { NavLogo } from "../NavLogo";
import { Drawer } from "../Drawer";
import { SignInLink } from "../SignInLink";
import { SignUpLink } from "../SignUpLink";
import { LogOut } from "../LogOut";

const MainNavigation = () => {
  const { userPersist } = useAuthContext();
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
                  onClick={() => setProgress(100)}
                >
                  <AiTwotoneHome style={styles.linkIcon} />
                  Home
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
                  to="/secure-content"
                  style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                  onClick={() => setProgress(100)}
                >
                  <FiUser style={styles.linkIcon} />
                  For you
                </NavLink>
              </div>

              <div style={styles.signLinks}>
                {userPersist ? (
                  <LogOut />
                ) : (
                  <>
                    <SignInLink />
                    <SignUpLink />
                  </>
                )}
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
