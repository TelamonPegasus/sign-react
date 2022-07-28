import { GiKeyLock } from "react-icons/gi";

import { styles } from "./styles";
import { StyledContainer } from "components/StyledContainer";
import { StyledHeading } from "components/StyledHeading";
import { SignInLink } from "components/Navigation/SignInLink";
import { SignUpLink } from "components/Navigation/SignUpLink";

const SecuredPageInfo = () => (
  <StyledContainer>
    <p>
      <GiKeyLock style={styles.icon} />
    </p>

    <StyledHeading text="Page Secured" />

    <p>Please log in to the content.</p>

    <div style={styles.linksContainer}>
      <SignInLink />
      <SignUpLink />
    </div>
  </StyledContainer>
);

export default SecuredPageInfo;
