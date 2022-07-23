import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "api/axios";
import * as yup from "yup";

import { useToastContext } from "context/ToastProvider";
import { SignUp } from "components/LogRegisterForm";

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
};

const SignUpPage = ({ setValue }) => {
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
      displayToast(error?.response?.data?.message, "error");

      if (error?.response.status === 409) {
        navigate("/login");
      }
    }
  }

  return (
    <div style={styles.container}>
      <SignUp
        control={control}
        errors={errors}
        handleSubmitData={handleSubmit(sendData)}
        setValue={setValue}
      />
    </div>
  );
};

export default SignUpPage;
