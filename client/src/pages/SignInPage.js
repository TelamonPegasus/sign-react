import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignIn } from "components/LogRegisterForm";

const SignInPage = ({ setValue }) => {
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

export default SignInPage;