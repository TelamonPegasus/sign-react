import {
  Paper,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TextInputController } from "../TextInputController";
import { FormHeader } from "../FormHeader";

const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 380,
  margin: "20px auto",
};
const submitButtonStyle = { margin: "8px 0" };
const informationStyle = { color: "#1bbd7e", letterSpacing: 2, wordSpacing: 3 };

const SignIn = (props) => {
  const { control, errors, handleSubmitData, setValue } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper component="form" elevation={10} style={paperStyle}>
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

      <Button
        type="submit"
        color="primary"
        style={submitButtonStyle}
        fullWidth
        aria-label="send"
        variant="contained"
        onClick={handleSubmitData}
      >
        Sign in
      </Button>
      <Typography>
        Do you have an account?
        <Link onClick={(e, val) => handleChange(e, "2")}> Sign Up</Link>
      </Typography>
    </Paper>
  );
};

export default SignIn;
