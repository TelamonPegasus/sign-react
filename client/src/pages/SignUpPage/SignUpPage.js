import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-ui/core";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import axios from "api/axios";

import { styles } from "./styles";
import { validationSchema } from "utilities";
import { usePopupContext } from "context/PopupProvider";

import { FormHeader } from "components/FormHeader";
import { TextInputController } from "components/Inputs/TextInputController";
import { PasswordInputController } from "components/Inputs/PasswordInputController";
import { StyledFormButton } from "components/StyledFormButton";
import { StyledForm } from "components/StyledForm";
import { StyledTextRequired } from "components/StyledTextRequired";
import { StyledContainer } from "components/StyledContainer";

const SignUpPage = () => {
  const endpoint = "/api/register";
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.register),
  });
  const { openToast } = usePopupContext();

  const sendData = (data) => registerUser(data);

  async function registerUser(newUser) {
    try {
      const response = await axios.post(endpoint, newUser);

      openToast(response.data?.message);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 404) {
        return openToast("Not found - please check address url", "error");
      }

      if (error?.response.status === 409) {
        openToast(error?.response?.data?.message, "error");
        navigate("/login");
      }
    }
  }

  return (
    <StyledContainer>
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
    </StyledContainer>
  );
};

export default SignUpPage;
