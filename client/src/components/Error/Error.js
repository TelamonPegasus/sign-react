import { Box } from "@mui/material";
import { BiError } from "react-icons/bi";

import { styles } from "./styles";

const Error = ({ text }) => (
  <Box style={{ ...styles.container }}>
    <BiError style={styles.icon} />

    <p style={styles.text}>{text}</p>
  </Box>
);

export default Error;
