import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

import { styles } from "./styles";

const SignUpLink = () => (
  <Link to="/register" style={styles.link}>
    <div style={styles.container}>
      <FiUser style={styles.icon} />

      <p style={styles.text}>Sign Up</p>
    </div>
  </Link>
);

export default SignUpLink;
