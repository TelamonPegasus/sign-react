import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import { styles } from "./styles";
import { useLogout } from "customHooks";

const LogOut = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();

    navigate("/");
  };

  return (
    <Link to="/" style={styles.link} onClick={handleLogOut}>
      <div style={styles.container}>
        <AiOutlineLogout style={styles.icon} />

        <p style={styles.text}>Log out</p>
      </div>
    </Link>
  );
};

export default LogOut;
