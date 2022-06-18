import { StyledButton } from "./styles";

const StyledSubmitButton = ({ onClick, text }) => (
  <StyledButton
    type="submit"
    fullWidth
    aria-label="send"
    variant="contained"
    onClick={onClick}
  >
    {text}
  </StyledButton>
);

export default StyledSubmitButton;
