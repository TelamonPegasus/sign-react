import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignIn } from "components/LogRegisterForm";
import { useAuth } from "customHooks/useAuth";

import { toast } from "react-toastify";

// import { API_URL } from "utilities";

// import api from "api";

import api from "api";
import axios from "api/axios";
const LOGIN_URL = "/api/login";

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
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const { setAuth } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   setError("");
  // }, [email, password]);

  const sendData = async (data) => {
    const { email, password } = data;

    try {
      // const response = await api.post(LOGIN_URL, data);

      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // console.log("roles:", roles);

      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ email, password, roles, accessToken });

      toast.success("You are logged in", toastConfig);

      if (roles.includes(5150)) {
        navigate("/admin", { state: { from: location }, replace: true });
      } else {
        navigate("/user-content", { state: { from: location }, replace: true });
      }
    } catch (error) {
      toast.error(() => handleError(error), toastConfig);
    }
  };

  function handleError(error) {
    switch (error) {
      case !error?.response:
        return "No Server Response";
      case error.response?.status === 400:
        return "Both fields are required";
      case error.response?.status === 401:
        return "Unauthorized";
      default:
        return "Login Failed";
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
