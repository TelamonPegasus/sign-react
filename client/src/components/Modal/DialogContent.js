import { withStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default DialogContent;
