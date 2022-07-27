import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography } from "@material-ui/core";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import axios from "api/axios";

import { useToastContext } from "context/ToastProvider";
import { FormHeader } from "components/FormHeader";
import { TextInputController } from "components/Inputs/TextInputController";
import { PasswordInputController } from "components/Inputs/PasswordInputController";
import { StyledFormButton } from "components/StyledFormButton";
import { StyledForm } from "components/StyledForm";
import { StyledTextRequired } from "components/StyledTextRequired";

const PASSWORD_REG =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().required("email is required").email(),
  password: yup
    .string()
    .required("enter your password")
    .trim()
    .matches(
      PASSWORD_REG,
      "Has to be minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  confirmPassword: yup
    .string()
    .required("confirm your password")
    .trim()
    .oneOf([yup.ref("password")], "passwords do not match"),
});

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
    padding: 0,
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
    cursor: "pointer",
  },
  textQuestion: { fontWeight: "bold" },
  span: { color: "#d63e2f" },
};

const SignUpPage = () => {
  const endpoint = "/api/register";
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { displayToast } = useToastContext();

  const sendData = (data) => registerUser(data);

  async function registerUser(newUser) {
    try {
      const response = await axios.post(endpoint, newUser);

      displayToast(response.data?.message);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 404) {
        return displayToast("Not found - please check address url", "error");
      }

      if (error?.response.status === 409) {
        displayToast(error?.response?.data?.message, "error");
        navigate("/login");
      }
    }
  }

  return (
    <div style={styles.container}>
      <StyledForm>
        <FormHeader avatar={<HowToRegOutlinedIcon />} heading="registration" />
        <StyledTextRequired />

        <div style={styles.inputsContainer}>
          <TextInputController
            control={control}
            name="name"
            label="name*"
            defaultValue=""
            error={!!errors.name}
            message={errors.name?.message ?? ""}
            autoFocus
          />

          <TextInputController
            control={control}
            name="email"
            label="email*"
            defaultValue=""
            error={!!errors.email}
            message={errors.email?.message ?? ""}
          />

          <PasswordInputController
            control={control}
            name="password"
            label="password*"
            error={!!errors.password}
            message={errors.password?.message ?? ""}
          />

          <PasswordInputController
            name="confirmPassword"
            label="confirmPassword*"
            control={control}
            error={!!errors.confirmPassword}
            message={errors.confirmPassword?.message ?? ""}
          />
        </div>

        <StyledFormButton
          onClick={handleSubmit(sendData)}
          text="registration"
        />

        <Typography style={styles.textQuestion}>
          Already have an account?
          <Link style={styles.link} to="/login">
            <span style={styles.span}> Sign In</span>
          </Link>
        </Typography>
      </StyledForm>
    </div>
  );
};

export default SignUpPage;
