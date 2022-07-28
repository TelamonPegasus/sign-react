import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { style } from "./styles";

const Loader = ({ text, styles }) => (
  <Box style={{ ...style.container, ...styles }}>
    <CircularProgress style={style.circle} />
    <p style={style.text}>{text}</p>
  </Box>
);

export default Loader;
