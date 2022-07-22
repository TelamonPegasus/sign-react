import { Box } from "@mui/material";
import { BiError } from "react-icons/bi";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px 0",
    marginTop: 20,
  },
  icon: {
    fontSize: 28,
    color: "crimson",
  },
  text: {
    fontSize: 22,
    color: "crimson",
    textTransform: "uppercase",
  },
};

const Error = ({ text }) => (
  <Box style={{ ...styles.container }}>
    <BiError style={styles.icon} />

    <p style={styles.text}>{text}</p>
  </Box>
);

export default Error;
