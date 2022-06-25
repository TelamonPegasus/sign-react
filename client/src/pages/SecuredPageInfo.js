import { GiKeyLock } from "react-icons/gi";

import { LogIn } from "components/LogIn";

const styles = {
  container: { margin: 70, padding: "0 20px 0 20px", textAlign: "center" },
  icon: { fontSize: 40 },
  heading: { color: "#d63e2f" },
};

const SecuredPageInfo = () => (
  <div style={styles.container}>
    <p>
      <GiKeyLock style={styles.icon} />
    </p>
    <h1>
      Page <span style={styles.heading}>Secured</span>
    </h1>

    <p>Please log in to the content.</p>

    <LogIn to="/login" />
  </div>
);

export default SecuredPageInfo;
