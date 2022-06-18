import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRegistrationContext } from "../context/RegistrationContext";
import { validationForm } from "validationForm";
import { SignUp } from "components/SignUp";

export const SignUpContainer = ({ setValue }) => {
  const { users, addUser, isLoading } = useRegistrationContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationForm),
  });

  const sendData = (data) => {
    addUser(data);
    console.log(data);
  };

  console.log(users);
  return (
    <SignUp
      control={control}
      errors={errors}
      handleSubmitData={handleSubmit(sendData)}
      setValue={setValue}
    />
  );
};
