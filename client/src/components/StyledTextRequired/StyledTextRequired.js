import { Typography } from "@material-ui/core";

import { styles } from "./styles";

const StyledTextRequired = () => (
  <Typography color="textSecondary" variant="body2" style={styles.textRequired}>
    *Fields required
  </Typography>
);

export default StyledTextRequired;
