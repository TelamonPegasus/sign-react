import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { validationForm } from "validationForm";
import { useRegistrationContext } from "context/RegistrationContext";
import { SignUp } from "components/LogRegisterForm";

import api from "api";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const SignUpPage = ({ setValue }) => {
  const REGISTER_ENDPOINT = "/register";
  const { users, isLoading } = useRegistrationContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationForm),
  });

  const navigate = useNavigate();

  const sendData = (data) => registerUser(data);

  async function registerUser(newUser) {
    try {
      const response = await api.post(`${REGISTER_ENDPOINT}`, newUser);

      toast.success(response.message, toastConfig);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message, toastConfig);

      if (error?.response.status === 409) {
        navigate("/login");
      }
    }
  }

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
