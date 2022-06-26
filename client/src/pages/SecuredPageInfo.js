import { GiKeyLock } from "react-icons/gi";

import { SignInLink } from "components/Navigation/SignInLink";
import { SignUpLink } from "components/Navigation/SignUpLink";

const styles = {
  container: {
    margin: 70,
    padding: "0 20px 0 20px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: { fontSize: 40 },
  heading: { color: "#d63e2f" },
  linksContainer: { display: "flex", flexDirection: "column", gap: 20 },
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

    <div style={styles.linksContainer}>
      <SignInLink />
      <SignUpLink />
    </div>
  </div>
);

export default SecuredPageInfo;
