import { Outlet, Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { AiTwotoneHome } from "react-icons/ai";

import { styles } from "./styles.js";

import { NavLogo } from "components/Navigation/NavLogo";
import { LoadingBarPage } from "components/LoadingBarPage";
import { useSetProgressBar } from "useSetProgressBar";
import { Drawer } from "../Drawer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
  },
}));

const SubNavigation = ({ isLogIn }) => {
  const { progress, setProgress } = useSetProgressBar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const classes = useStyles();

  return (
    <>
      <LoadingBarPage progress={progress} setProgress={setProgress} />
      <AppBar position="static" className={classes.appBar}>
        <CssBaseline />

        <Toolbar
          className={classes.toolBar}
          style={
            isMobile
              ? {
                  justifyContent: "space-between",
                }
              : {}
          }
        >
          <Link to="/" style={styles.link}>
            <NavLogo />
          </Link>

          <NavLink to="/" style={isMobile ? { display: "none" } : styles.link}>
            <AiTwotoneHome style={styles.linkIcon} />
            Home
          </NavLink>

          {isMobile && <Drawer />}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default SubNavigation;
