import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { TextInputController } from "./TextInputController";

import { FormHeader } from "./FormHeader";
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
  inputsContainer: { display: "flex", flexDirection: "column", gap: 10 },
  link: {
    color: "inherit",
    textDecoration: "inherit",
    cursor: "pointer",
  },
  textQuestion: { fontWeight: "bold" },
  span: { color: "#d63e2f" },
};

const SignIn = (props) => {
  const { control, errors, handleSubmitData, register } = props;

  return (
    <form style={styles.form}>
      <FormHeader avatar={<LockOutlinedIcon />} heading="sign in" />

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
          name="email"
          label="email*"
          defaultValue=""
          error={!!errors.email}
          message={errors.email?.message ?? ""}
          autoFocus
        />

        <PasswordInputController
          name="password"
          label="password*"
          control={control}
          register={register}
          error={!!errors.password}
          message={errors.password?.message ?? ""}
        />
      </div>

      <StyledFormButton onClick={handleSubmitData} text="log in" />

      <Typography style={styles.textQuestion}>
        Don't have an account yet?
        <Link style={styles.link} to="/register">
          <span style={styles.span}> Register</span>
        </Link>
      </Typography>
    </form>
  );
};

export default SignIn;
