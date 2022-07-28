import { styles } from "./styles";

const StyledContainer = ({ children }) => (
  <div style={styles.container}>{children}</div>
);

export default StyledContainer;
