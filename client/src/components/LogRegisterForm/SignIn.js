import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { TextInputController } from "./TextInputController";

import { FormHeader } from "./FormHeader";
import { StyledFormButton } from "./StyledFormButton";

const informationStyle = { color: "#d63e2f", letterSpacing: 2, wordSpacing: 3 };

const SignIn = (props) => {
  const { control, errors, handleSubmitData } = props;

  return (
    <form style={{ maxWidth: 400, margin: "0 auto", marginTop: 50 }}>
      <FormHeader avatar={<LockOutlinedIcon />} heading="sign in" />

      <Typography
        color="textSecondary"
        variant="body2"
        style={informationStyle}
      >
        *Fields required
      </Typography>

      <TextInputController
        control={control}
        name="email"
        label="email"
        defaultValue=""
        error={!!errors.email}
        message={errors.email?.message ?? ""}
        autoFocus
      />

      <TextInputController
        control={control}
        name="password"
        label="password"
        type="password"
        defaultValue=""
        error={!!errors.password}
        message={errors.password?.message ?? ""}
      />

      <StyledFormButton onClick={handleSubmitData} text="log in" />

      <Typography style={{ fontWeight: "bold" }}>
        Don't have an account yet?
        <Link
          style={{
            color: "inherit",
            textDecoration: "inherit",
            cursor: "pointer",
          }}
          to="/register"
        >
          <span style={{ color: "#d63e2f" }}> Register</span>
        </Link>
      </Typography>
    </form>
  );
};

export default SignIn;
