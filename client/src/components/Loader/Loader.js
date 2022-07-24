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
  circle: {
    color: "#d63e2f",
  },
  text: {
    color: "#d63e2f",
    fontSize: 16,
    textTransform: "uppercase",
  },
};

const Loader = ({ text, styles }) => (
  <Box style={{ ...style.container, ...styles }}>
    <CircularProgress style={style.circle} />
    <p style={style.text}>{text}</p>
  </Box>
);

export default Loader;
