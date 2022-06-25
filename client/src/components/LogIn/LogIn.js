import { Link } from "react-router-dom";

import { AiOutlineLogin } from "react-icons/ai";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: 20,
  },
  icon: { color: "#d63e2f" },
  text: {
    color: "#d63e2f",
    fontSize: 15,
    padding: 0,
    margin: 0,
  },
};

const LogIn = ({ to }) => (
  <div style={styles.container}>
    <Link to={to} style={styles.link}>
      <AiOutlineLogin style={styles.icon} />
    </Link>
    <p style={styles.text}>Log in</p>
  </div>
);

export default LogIn;
