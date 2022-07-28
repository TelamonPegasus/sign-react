import { styles } from "./styles";

const StyledContainer = ({ children }) => (
  <main style={styles.container}>{children}</main>
);

export default StyledContainer;
