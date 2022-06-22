import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, CssBaseline, makeStyles } from "@material-ui/core";

import { NavLogo } from "components/Navigation/NavLogo";
import { LoadingBarPage } from "components/LoadingBarPage";
import { useSetProgressBar } from "useSetProgressBar";

const stylesLink = {
  textDecoration: "none",
  color: "white",
  fontSize: 20,
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "transparent",
  },
}));

const SubNavigation = () => {
  const { progress, setProgress } = useSetProgressBar();
  const classes = useStyles();

  return (
    <>
      <LoadingBarPage progress={progress} setProgress={setProgress} />
      <AppBar position="static" className={classes.toolbar}>
        <CssBaseline />
        <Toolbar>
          <Link to="/" style={stylesLink}>
            <NavLogo />
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default SubNavigation;
