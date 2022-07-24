import PropTypes from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const stylesError = { color: "crimson" };

const PasswordInputController = ({ name, label, control, error, message }) => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { ref, ...field } }) => (
          <FormControl variant="filled" fullWidth {...field}>
            <InputLabel htmlFor={`filled-adornment-${name}`}>
              {label}
            </InputLabel>
            <FilledInput
              id={`filled-adornment-${name}`}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              error={error}
              margin="dense"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        )}
      />

      <Typography variant="inherit" style={stylesError}>
        {message}
      </Typography>
    </>
  );
};

PasswordInputController.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  message: PropTypes.string,
};

export default PasswordInputController;
