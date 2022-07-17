import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px 0",
  },
};

const Loader = ({ text, styles }) => (
  <Box style={{ ...style.container, ...styles }}>
    <CircularProgress />
    <p>{text}</p>
  </Box>
);

export default Loader;
