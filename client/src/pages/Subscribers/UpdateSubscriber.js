import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { StyledFormButton } from "components/LogRegisterForm/StyledFormButton";
import { Typography } from "@material-ui/core";

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
  information: {
    color: "#d63e2f",
    letterSpacing: 2,
    wordSpacing: 3,
    marginBottom: 20,
  },
  error: { color: "crimson", fontSize: 12, marginTop: 5 },
};

const options = [
  { value: "2001", label: "User" },
  { value: "1984", label: "Editor" },
  { value: "5150", label: "Admin" },
];

const UpdateSubscriber = () => {
  const endpoint = "/api/subscribers";
  const [subscriber, setSubscriber] = useState({});
  const [error, setError] = useState({ text: "" });
  const [selectedValue, setSelectedValue] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSubscriberData = async () => {
      try {
        const response = await axiosPrivate.get(`${endpoint}/${id}`, {
          signal: controller.signal,
        });

        isMounted && setSubscriber(response.data);

        const roleValue = {
          roles: response.data?.roles?.Admin
            ? 5150
            : response.data?.roles?.Editor
            ? 1984
            : 2001,
        };

        reset(roleValue);
        setSelectedValue(roleValue);
      } catch (err) {
        setError(err);
      }
    };

    getSubscriberData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [reset]);

  const updateSubscriberData = async (data) => {
    if (isRoleAlreadySelected()) {
      setError({ text: "Role already exist, please choose another one" });
      return;
    }

    try {
      await axiosPrivate.put(`${endpoint}/${id}`, data);

      setError({ text: "" });
      navigate("/subscribers");
    } catch (error) {
      console.log(error);
    }
  };

  function isRoleAlreadySelected() {
    return (
      subscriber.roles?.Admin === selectedValue.roles ||
      subscriber.roles?.Editor === selectedValue.roles ||
      subscriber.roles?.User === selectedValue.roles
    );
  }

  return (
    <div style={styles.container}>
      <form
        style={{ maxWidth: 400, margin: "0 auto", marginTop: 50 }}
        onSubmit={handleSubmit(updateSubscriberData)}
      >
        <Typography
          color="textSecondary"
          variant="body2"
          style={styles.information}
        >
          *Fields required
        </Typography>
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
                  onChange(e);
                  setSelectedValue({ roles: e.target.value });
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
        <Typography style={styles.error}>{error?.text}</Typography>

        <StyledFormButton onClick={updateSubscriberData} text="update" />
      </form>
    </div>
  );
};

export default UpdateSubscriber;
