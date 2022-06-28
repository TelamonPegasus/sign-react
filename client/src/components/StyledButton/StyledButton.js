import { Button } from "@material-ui/core";

import { useStyles } from "./styles";

const StyledButton = ({ onClick, text, fullWidth }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth={fullWidth}
      aria-label="send"
      variant="contained"
      className={classes.button}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
