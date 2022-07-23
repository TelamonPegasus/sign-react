import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import axios from "api/axios";
import { useAuthContext } from "context/AuthProvider";
import { SignIn } from "components/LogRegisterForm";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const validationSchema = yup.object().shape({
  email: yup.string().required("email is required").email(),
  password: yup.string().required("password is required"),
});

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
  } = useForm({ resolver: yupResolver(validationSchema) });

  const LOGIN_URL = "/api/login";

  const sendData = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // const email = response?.data.email;
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
      // toast.error(() => handleError(error), toastConfig);
      console.log(error);
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
