import { Button } from "@material-ui/core";

import { useStyles } from "./styles";

const StyledSubmitButton = ({ onClick, text }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      aria-label="send"
      variant="contained"
      className={classes.button}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default StyledSubmitButton;
