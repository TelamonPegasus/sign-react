import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 3,
    height: 30,
    minWidth: 80,
    cursor: "pointer",
    backgroundColor: "#eee",
    padding: "5px 10px",
    borderRadius: 4,
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

const SignUpLink = () => (
  <Link to="/register" style={styles.link}>
    <div style={styles.container}>
      <FiUser style={styles.icon} />

      <p style={styles.text}>Sign Up</p>
    </div>
  </Link>
);

export default SignUpLink;
