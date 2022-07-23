import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

import { FormHeader } from "./FormHeader";
import { TextInputController } from "./TextInputController";
import { StyledFormButton } from "./StyledFormButton";
import { PasswordInputController } from "./PasswordInputController";

const styles = {
  form: { maxWidth: 400, margin: "0 auto", marginTop: 50 },
  textRequired: {
    color: "#d63e2f",
    letterSpacing: 2,
    wordSpacing: 3,
    marginBottom: 15,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
    padding: 0,
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
    cursor: "pointer",
  },
  textQuestion: { fontWeight: "bold" },
  span: { color: "#d63e2f" },
};

const SignUp = (props) => {
  const { control, errors, handleSubmitData } = props;

  return (
    <form style={styles.form}>
      <FormHeader avatar={<HowToRegOutlinedIcon />} heading="registration" />

      <Typography
        color="textSecondary"
        variant="body2"
        style={styles.textRequired}
      >
        *Fields required
      </Typography>

      <div style={styles.inputsContainer}>
        <TextInputController
          control={control}
          name="name"
          label="name*"
          defaultValue=""
          error={!!errors.name}
          message={errors.name?.message ?? ""}
          autoFocus
        />

        <TextInputController
          control={control}
          name="email"
          label="email*"
          defaultValue=""
          error={!!errors.email}
          message={errors.email?.message ?? ""}
        />

        <PasswordInputController
          control={control}
          name="password"
          label="password*"
          error={!!errors.password}
          message={errors.password?.message ?? ""}
        />

        <PasswordInputController
          name="confirmPassword"
          label="confirmPassword*"
          control={control}
          error={!!errors.confirmPassword}
          message={errors.confirmPassword?.message ?? ""}
        />
      </div>

      <StyledFormButton onClick={handleSubmitData} text="registration" />

      <Typography style={styles.textQuestion}>
        Already have an account?
        <Link style={styles.link} to="/login">
          <span style={styles.span}> Sign In</span>
        </Link>
      </Typography>
    </form>
  );
};

SignUp.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  handleSubmitData: PropTypes.func,
};

export default SignUp;
