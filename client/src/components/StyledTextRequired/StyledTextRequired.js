const { Typography } = require("@material-ui/core");

const styles = {
  textRequired: {
    color: "#d63e2f",
    letterSpacing: 2,
    wordSpacing: 3,
    marginBottom: 15,
  },
};

const StyledTextRequired = () => (
  <Typography color="textSecondary" variant="body2" style={styles.textRequired}>
    *Fields required
  </Typography>
);

export default StyledTextRequired;
