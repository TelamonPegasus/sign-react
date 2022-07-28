import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { styles } from "./styles";
import { useAuthContext } from "context/AuthProvider";
import { useAxiosPrivate, useGetItemData } from "customHooks";
import { usePopupContext } from "context/PopupProvider";

import { StyledFormButton } from "components/StyledFormButton";
import { Typography } from "@material-ui/core";
import { StyledForm } from "components/StyledForm";
import { StyledTextRequired } from "components/StyledTextRequired";
import { Loader } from "components/Loader";
import { Error } from "components/Error";
import { FormHeader } from "components/FormHeader";
import { StyledButton } from "components/StyledButton";
import { SelectController } from "components/Inputs/SelectController";

const options = [
  { value: "2001", label: "User" },
  { value: "1984", label: "Editor" },
  { value: "5150", label: "Admin" },
];

const UpdateSubscriber = () => {
  const endpoint = "/api/subscribers";
  const [error, setError] = useState({ text: "" });
  const [selectedValue, setSelectedValue] = useState("");
  const { auth } = useAuthContext();
  const { openToast } = usePopupContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, control, setValue } = useForm();

  const { itemData: subscriber } = useGetItemData(`${endpoint}/${id}`);

  const defaultValues = {
    roles:
      subscriber?.data?.roles?.Admin ||
      subscriber?.data?.roles?.Editor ||
      subscriber?.data?.roles?.User,
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue("roles", defaultValues.roles);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [setValue, defaultValues.roles]);

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
      openToast(error.response.statusText, "error");
    }
  };

  function isRoleAlreadySelected() {
    return (
      subscriber.roles?.Admin === selectedValue.roles ||
      subscriber.roles?.Editor === selectedValue.roles ||
      subscriber.roles?.User === selectedValue.roles
    );
  }

  const handleNavigate = () => navigate(-1);

  return (
    <>
      {subscriber.status === "loading" ? (
        <Loader text="loading subscriber's data" />
      ) : subscriber.status === "error" ? (
        <Error text="error occurred" />
      ) : (
        <div style={styles.container}>
          <StyledForm onSubmit={handleSubmit(updateSubscriberData)}>
            <FormHeader
              avatar={<EditOutlinedIcon />}
              heading="update subscriber"
            />
            <StyledTextRequired />

            <SelectController
              control={control}
              setSelectedValue={setSelectedValue}
              options={options}
            />

            <Typography style={styles.error}>{error?.text}</Typography>

            <StyledFormButton onClick={updateSubscriberData} text="update" />
          </StyledForm>

          <StyledButton onClick={handleNavigate} />
        </div>
      )}
    </>
  );
};

export default UpdateSubscriber;
