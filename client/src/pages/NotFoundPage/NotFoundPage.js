import { Link } from "react-router-dom";
import { VscSearchStop } from "react-icons/vsc";
import { AiTwotoneHome } from "react-icons/ai";

import { styles } from "./styles";
import { StyledContainer } from "components/StyledContainer";
import { StyledHeading } from "components/StyledHeading";

const NotFoundPage = () => (
  <StyledContainer>
    <p>
      <VscSearchStop style={styles.icon} />
    </p>

    <StyledHeading tet="Page Not Found" />

    <p>Please check your url address or</p>

    <Link to="/">
      <AiTwotoneHome style={{ ...styles.icon, ...styles.heading }} />
    </Link>
  </StyledContainer>
);

export default NotFoundPage;
