import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignIn } from "components/LogRegisterForm";
import { useRegistrationContext } from "context/RegistrationContext";

import { toast } from "react-toastify";

import { API_URL } from "utilities";
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

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const sendData = (data) => loginUser(data);

  async function loginUser(registeredUser) {
    try {
      const { token } = await api.post(`${API_URL}/api/login`, registeredUser);

      localStorage.setItem("token", token);

      toast.success("You are in!", toastConfig);
      navigate("/user-content");
    } catch (error) {
      toast.error("You can not log in", toastConfig);
    }
  }

  return (
    <SignIn
      control={control}
      errors={errors}
      handleSubmitData={handleSubmit(sendData)}
    />
  );
};

export default SignInPage;
