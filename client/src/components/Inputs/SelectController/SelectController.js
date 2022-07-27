import { Controller } from "react-hook-form";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const SelectController = ({ control, setSelectedValue, options }) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel id="roles-label">roles</InputLabel>
    <Controller
      name="roles"
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Select
          labelId="roles-label"
          id="roles"
          label="roles"
          value={value}
          onChange={(e) => {
            setSelectedValue({
              roles: +e.target.value,
            });

            onChange(e);
          }}
        >
          {options.map(({ value, label }, index) => (
            <MenuItem key={`menuItem-${index}`} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      )}
      defaultValue=""
    />
  </FormControl>
);

export default SelectController;
