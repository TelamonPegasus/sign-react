import { styles } from "./styles";

const StyledHeading = ({ text, name = "" }) => (
  <h1 style={styles.heading}>
    {text} {name}
  </h1>
);

export default StyledHeading;
