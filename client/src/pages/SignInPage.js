import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "api/axios";
import * as yup from "yup";

import { usePopupContext } from "context/PopupProvider";
import { useAuthContext } from "context/AuthProvider";
import { StyledForm } from "components/StyledForm";
import { FormHeader } from "components/FormHeader";
import { StyledTextRequired } from "components/StyledTextRequired";
import { TextInputController } from "components/Inputs/TextInputController";
import { PasswordInputController } from "components/Inputs/PasswordInputController";
import { StyledFormButton } from "components/StyledFormButton";

const validationSchema = yup.object().shape({
  email: yup.string().required("email is required").email(),
  password: yup.string().required("password is required"),
});

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
  inputsContainer: { display: "flex", flexDirection: "column", gap: 10 },
  link: {
    color: "inherit",
    textDecoration: "inherit",
    cursor: "pointer",
  },
  textQuestion: { fontWeight: "bold" },
  span: { color: "#d63e2f" },
};

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, setUserPersist } = useAuthContext();
  const { openToast } = usePopupContext();
  const {
    handleSubmit,
    control,
    register,
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
      if (error.response.status === 404) {
        return openToast("Not found - please check address url", "error");
      }

      openToast(error?.response?.data?.message, "error");
    }
  };

  function toggleUserPersist() {
    setUserPersist(true);
  }

  return (
    <div style={styles.container}>
      <StyledForm>
        <FormHeader avatar={<LockOutlinedIcon />} heading="sign in" />

        <StyledTextRequired />

        <div style={styles.inputsContainer}>
          <TextInputController
            control={control}
            name="email"
            label="email*"
            defaultValue=""
            error={!!errors.email}
            message={errors.email?.message ?? ""}
            autoFocus
          />

          <PasswordInputController
            name="password"
            label="password*"
            control={control}
            register={register}
            error={!!errors.password}
            message={errors.password?.message ?? ""}
          />
        </div>

        <StyledFormButton onClick={handleSubmit(sendData)} text="log in" />

        <Typography style={styles.textQuestion}>
          Don't have an account yet?
          <Link style={styles.link} to="/register">
            <span style={styles.span}> Register</span>
          </Link>
        </Typography>
      </StyledForm>
    </div>
  );
};

export default SignInPage;
