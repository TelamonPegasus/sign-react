import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

import { FormHeader } from "./FormHeader";
import { TextInputController } from "./TextInputController";
import { StyledButton } from "components/StyledButton";

const informationStyle = { color: "#d63e2f", letterSpacing: 2, wordSpacing: 3 };

const SignUp = (props) => {
  const { control, errors, handleSubmitData } = props;

  return (
    <form style={{ maxWidth: 400, margin: "0 auto", marginTop: 50 }}>
      <FormHeader avatar={<HowToRegOutlinedIcon />} heading="registration" />

      <Typography
        color="textSecondary"
        variant="body2"
        style={informationStyle}
      >
        *Fields required
      </Typography>

      <TextInputController
        control={control}
        name="name"
        label="name"
        defaultValue=""
        error={!!errors.name}
        message={errors.name?.message ?? ""}
      />

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

      <TextInputController
        control={control}
        name="confirmPassword"
        label="confirm password"
        defaultValue=""
        error={!!errors.confirmPassword}
        message={errors.confirmPassword?.message ?? ""}
      />

      <StyledButton
        onClick={handleSubmitData}
        text="registration"
        fullWidth={true}
      />

      <Typography style={{ fontWeight: "bold" }}>
        Already have an account?
        <Link
          style={{
            color: "inherit",
            textDecoration: "inherit",
            cursor: "pointer",
          }}
          to="/login"
          // onClick={(e, val) => handleChangeTabValue(e, "1")}
        >
          <span style={{ color: "#d63e2f" }}> Sign In</span>
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
