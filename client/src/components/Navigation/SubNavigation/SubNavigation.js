import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import { NavLogo } from "components/Navigation/NavLogo";
import { LoadingBarPage } from "components/LoadingBarPage";
import { useSetProgressBar } from "useSetProgressBar";
import { Drawer } from "../Drawer";

const styles = {
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: 20,
  },
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
  },
  toolBar: { justifyContent: "space-between" },
}));

const SubNavigation = () => {
  const { progress, setProgress } = useSetProgressBar();
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <LoadingBarPage progress={progress} setProgress={setProgress} />
      <AppBar position="static" className={classes.appBar}>
        <CssBaseline />

        <Toolbar className={classes.toolBar}>
          <Link to="/" style={styles.link}>
            <NavLogo />
          </Link>

          {isMobile && <Drawer />}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default SubNavigation;
