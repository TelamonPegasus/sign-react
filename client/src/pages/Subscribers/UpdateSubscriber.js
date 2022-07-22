import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import { useToastContext } from "context/ToastProvider";
import { useAuthContext } from "context/AuthProvider";
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
  const { displayToast } = useToastContext();
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getSubscriberData = async () => {
      try {
        const response = await axiosPrivate.get(`${endpoint}/${id}`, {
          cancelToken: source.token,
        });

        setSubscriber(response.data);

        const roleValue = {
          roles:
            response.data?.roles?.Admin ||
            response.data?.roles?.Editor ||
            response.data?.roles.User,
        };

        reset(roleValue);
      } catch (error) {
        if (axios.isCancel(error)) {
          displayToast("Something went wrong - reload the page", "error");
        } else {
          throw error;
        }
      }
    };

    const timeID = setTimeout(getSubscriberData, 100);

    return () => {
      source.cancel();
      clearTimeout(timeID);
    };
  }, [reset]);

  const updateSubscriberData = async (data) => {
    if (isRoleAlreadySelected()) {
      setError({ text: "Role already exist, please choose another one" });
      return;
    }

    const newData = { updatedRole: data?.roles, roles: auth?.roles };

    try {
      await axiosPrivate.put(`${endpoint}/${id}`, newData);

      setError({ text: "" });
      navigate("/subscribers");
    } catch (error) {
      // displayToast(error.response.statusText, "error");
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
                  setSelectedValue((prevEvent) => ({
                    ...prevEvent,
                    roles: +e.target.value,
                  }));

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
        <Typography style={styles.error}>{error?.text}</Typography>

        <StyledFormButton onClick={updateSubscriberData} text="update" />
      </form>
    </div>
  );
};

export default UpdateSubscriber;
