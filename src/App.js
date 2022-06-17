import { useState } from "react";

import Box from "@mui/material/Box";

import Tab from "@material-ui/core/Tab";
import { TabContext } from "@material-ui/lab";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import { SignInContainer } from "./pages/SignInContainer";
import { SignUpContainer } from "./pages/SignUpContainer";

import { RegistrationProvider } from "context/RegistrationContext";

export default function App() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Sign in" value="1" />
            <Tab label="Sign up" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/* <RegistrationProvider> */}
          <SignInContainer setValue={setValue} />
          {/* </RegistrationProvider> */}
        </TabPanel>
        <TabPanel value="2">
          <RegistrationProvider>
            <SignUpContainer setValue={setValue} />
          </RegistrationProvider>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
