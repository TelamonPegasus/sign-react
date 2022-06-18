import { useContext } from "react";
import { Box } from "@mui/material";
import { Tab } from "@material-ui/core";
import { TabList, TabPanel, TabContext } from "@material-ui/lab";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RegistrationContext } from "./context/RegistrationContext";
import { SignInContainer } from "./pages/SignInContainer";
import { SignUpContainer } from "./pages/SignUpContainer";

export default function App() {
  const { tabValue, handleChangeTabValue } = useContext(RegistrationContext);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTabValue}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Sign in" value="1" />
              <Tab label="Sign up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SignInContainer />
          </TabPanel>
          <TabPanel value="2">
            <SignUpContainer />
          </TabPanel>
        </TabContext>
      </Box>

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
}
