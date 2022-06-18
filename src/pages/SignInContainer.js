import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationForm } from "validationForm";
import { SignIn } from "../components/LogRegisterForm";


export const SignInContainer = ({ setValue }) => {
  // const { users, addUser, isLoading } = useContext(RegistrationContext);/
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const sendData = (data) => {
    console.log(data);
  };

  return (
    <SignIn
      control={control}
      errors={errors}
      handleSubmitData={handleSubmit(sendData)}
      setValue={setValue}
    />
  );
};
