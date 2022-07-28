import { Controller } from "react-hook-form";
import { Typography, TextField } from "@mui/material";

import { styles } from "./styles";

const TextInputController = ({
  control,
  name,
  label,
  defaultValue,
  error,
  message,
  type,
  autoFocus,
}) => (
  <>
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          inputRef={ref}
          variant="filled"
          label={label}
          error={error}
          fullWidth
          margin="dense"
          type={type}
          autoFocus={autoFocus}
          style={styles.input}
        />
      )}
    />

    <Typography variant="inherit" style={styles.error}>
      {message}
    </Typography>
  </>
);

export default TextInputController;
