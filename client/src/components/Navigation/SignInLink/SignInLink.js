import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";

import { styles } from "./styles";

const SignInLink = () => (
  <Link to="/login" style={styles.link}>
    <div style={styles.container}>
      <AiOutlineLogin style={styles.icon} />

      <p style={styles.text}>Log in</p>
    </div>
  </Link>
);

export default SignInLink;
