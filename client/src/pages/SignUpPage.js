import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationForm } from "validationForm";
import { useRegistrationContext } from "context/RegistrationContext";
import { SignUp } from "components/LogRegisterForm";

const SignUpPage = ({ setValue }) => {
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

export default SignUpPage;
