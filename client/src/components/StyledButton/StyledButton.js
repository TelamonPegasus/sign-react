import { Button } from "@material-ui/core";
import { RiArrowGoBackFill } from "react-icons/ri";

import { styles, useStyles } from "./styles";

const StyledButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      aria-label="send"
      variant="contained"
      className={classes.button}
      onClick={onClick}
    >
      <RiArrowGoBackFill style={styles.buttonIcon} />
    </Button>
  );
};

export default StyledButton;
