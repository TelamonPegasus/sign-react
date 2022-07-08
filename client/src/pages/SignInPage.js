import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignIn } from "components/LogRegisterForm";

import { toast } from "react-toastify";

// import { API_URL } from "utilities";

// import api from "api";

import api from "api";
import axios from "api/axios";
import { useAuthContext } from "context/AuthProvider";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const { setAuth, setUserPersist } = useAuthContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const LOGIN_URL = "/api/login";

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

      const name = response?.data?.name;
      const roles = response?.data?.roles;
      const accessToken = response?.data?.accessToken;

      setAuth({ name, roles, accessToken });

      navigate("/secure-content", {
        state: { from: location },
        replace: true,
      });

      toggleUserPersist();
    } catch (error) {
      toast.error(() => handleError(error), toastConfig);
    }
  };

  function toggleUserPersist() {
    setUserPersist(true);
  }

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
    <div style={styles.container}>
      <SignIn
        control={control}
        errors={errors}
        handleSubmitData={handleSubmit(sendData)}
      />
    </div>
  );
};

export default SignInPage;
