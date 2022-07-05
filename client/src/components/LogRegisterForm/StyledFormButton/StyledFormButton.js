import { Button } from "@material-ui/core";

import { useStyles } from "./styles";

const StyledFormButton = ({ text, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      aria-label="submit"
      variant="contained"
      className={classes.button}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default StyledFormButton;
