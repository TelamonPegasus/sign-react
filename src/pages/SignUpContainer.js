import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationForm } from "validationForm";
import { SignUp } from "components/SignUp";
import { RegistrationContext } from "context/RegistrationContext";

export const SignUpContainer = ({ setValue }) => {
  const { users, addUser, isLoading } = useContext(RegistrationContext);
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
