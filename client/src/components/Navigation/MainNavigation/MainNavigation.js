import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { BiUserCircle } from "react-icons/bi";

import { useSetProgressBar } from "useSetProgressBar";
import { NavLogo } from "../NavLogo";
import { Drawer } from "../Drawer";
import { LoadingBarPage } from "components/LoadingBarPage";

const styles = {
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: 20,
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px 0 20px",
    marginLeft: 100,
    width: "100%",
  },
  icon: { color: "#d63e2f" },
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  toolbar: { justifyContent: "space-between" },
}));

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
            <div style={styles.links}>
              <div
                style={{
                  display: "flex",
                  gap: 40,
                }}
              >
                <Link
                  to="/courses"
                  style={styles.link}
                  onClick={() => setProgress(100)}
                >
                  Courses
                </Link>
                <Link
                  to="/about"
                  style={styles.link}
                  onClick={() => setProgress(100)}
                >
                  About us
                </Link>
              </div>
              <Link
                to="/login"
                style={styles.link}
                onClick={() => setProgress(100)}
              >
                <BiUserCircle style={styles.icon} />
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default MainNavigation;
