import { Button } from "@material-ui/core";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)({
  boxShadow: "none",
  textTransform: "uppercase",
  border: "1px solid",
  lineHeight: 1.5,
  padding: "1rem 3rem",
  backgroundColor: "#d63e2f",
  margin: "30px 0 30px 0",
  fontSize: 18,
  color: "white",
  "&:hover": {
    backgroundColor: "#c74538",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#c74538",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
