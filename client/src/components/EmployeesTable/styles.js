import { Button, TableContainer, Paper } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

const stylesButton = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export const StyledButton = withStyles(stylesButton)((props) => {
  const { classes, icon, color, onClick } = props;
  return (
    <Button
      className={classes.root}
      variant="contained"
      color={color}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
});

const stylesTableContainer = (theme) => ({
  root: { maxWidth: 700, marginBottom: 30 },
});

export const StyledTableContainer = withStyles(stylesTableContainer)(
  (props) => {
    const { classes, children } = props;

    return (
      <TableContainer component={Paper} className={classes.root}>
        {children}
      </TableContainer>
    );
  }
);
