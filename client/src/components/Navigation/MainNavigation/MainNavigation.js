import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, CssBaseline, makeStyles } from "@material-ui/core";
import { BiUserCircle } from "react-icons/bi";

import { NavLogo } from "components/Navigation/NavLogo";
import { LoadingBarPage } from "components/LoadingBarPage";
import { useSetProgressBar } from "useSetProgressBar";

const stylesLink = {
  textDecoration: "none",
  color: "black",
  fontSize: 20,
};

const stylesLinks = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 20px 0 20px",
  marginLeft: 100,
  width: "100%",
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "transparent",
  },
}));

const MainNavigation = () => {
  const classes = useStyles();

  const { progress, setProgress } = useSetProgressBar();

  return (
    <>
      <LoadingBarPage progress={progress} setProgress={setProgress} />
      <AppBar position="static" className={classes.toolbar}>
        <CssBaseline />
        <Toolbar>
          <Link to="/" style={stylesLink}>
            <NavLogo />
          </Link>
          <div style={stylesLinks}>
            <div
              style={{
                display: "flex",
                gap: 40,
              }}
            >
              <Link
                to="/courses"
                style={stylesLink}
                onClick={() => setProgress(100)}
              >
                Courses
              </Link>
              <Link
                to="/about"
                style={stylesLink}
                onClick={() => setProgress(100)}
              >
                About us
              </Link>
            </div>
            <Link
              to="/login"
              style={stylesLink}
              onClick={() => setProgress(100)}
            >
              <BiUserCircle style={{ color: "#d63e2f" }} />
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default MainNavigation;
