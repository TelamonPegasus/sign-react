import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "@mui/material";
import { Tab } from "@material-ui/core";
import { TabList, TabPanel, TabContext } from "@material-ui/lab";

import { useRegistrationContext } from "context/RegistrationContext";
import { SignInPage, SignUpPage } from "pages";

export default function App() {
  const { tabValue, handleChangeTabValue } = useRegistrationContext();
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
            <SignInPage />
          </TabPanel>
          <TabPanel value="2">
            <SignUpPage />
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