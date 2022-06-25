import { Link } from "react-router-dom";
import { VscSearchStop } from "react-icons/vsc";
import { AiTwotoneHome } from "react-icons/ai";

const styles = {
  container: { margin: 70, padding: "0 20px 0 20px", textAlign: "center" },
  icon: { fontSize: 40 },
  heading: { color: "#d63e2f" },
};

const NotFoundPage = () => (
  <div style={styles.container}>
    <p>
      <VscSearchStop style={styles.icon} />
    </p>
    <h1>
      Page <span style={styles.heading}>Not Found</span>
    </h1>

    <p>Please check your url address or</p>

    <Link to="/">
      <AiTwotoneHome style={{ ...styles.icon, ...styles.heading }} />
    </Link>
  </div>
);

export default NotFoundPage;
