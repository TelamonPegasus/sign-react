import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "api/axios";
import * as yup from "yup";

import { useToastContext } from "context/ToastProvider";
import { useAuthContext } from "context/AuthProvider";
import { SignIn } from "components/LogRegisterForm";

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
  const { setAuth, setUserPersist } = useAuthContext();
  const { displayToast } = useToastContext();
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
      displayToast(error?.response?.data?.message, "error");
    }
  };

  function toggleUserPersist() {
    setUserPersist(true);
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
