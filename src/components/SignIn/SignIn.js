import { useContext } from "react";
import {
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { RegistrationContext } from "context/RegistrationContext";

import { TextInputController } from "../TextInputController";
import { FormHeader } from "../FormHeader";
import { StyledSubmitButton } from "../StyledSubmitButton";

const informationStyle = { color: "#d63e2f", letterSpacing: 2, wordSpacing: 3 };

const SignIn = (props) => {
  const { control, errors, handleSubmitData } = props;
  const { handleChangeTabValue } = useContext(RegistrationContext);

  return (
    <form style={{ maxWidth: 400, margin: "0 auto" }}>
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
      />

      <TextInputController
        control={control}
        name="password"
        label="password"
        defaultValue=""
        error={!!errors.password}
        message={errors.password?.message ?? ""}
      />

      {/* <FormControlLabel
        control={<Checkbox name="checkedB" color="primary" />}
        label="Remember me"
      /> */}

      <StyledSubmitButton onClick={handleSubmitData} text="log in" />

      <Typography style={{ fontWeight: "bold" }}>
        Don't have an account yet?
        <Link
          style={{
            color: "inherit",
            textDecoration: "inherit",
            cursor: "pointer",
          }}
          onClick={(e, val) => handleChangeTabValue(e, "2")}
        >
          <span style={{ color: "#d63e2f" }}> Register</span>
        </Link>
      </Typography>
    </form>
  );
};

export default SignIn;
