import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import { SignUp } from "components/LogRegisterForm";
import axios from "api/axios";

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
  name: yup.string().required("name is required"),
  email: yup.string().required("email is required").email(),
  password: yup
    .string()
    .required("enter your password")
    .trim()
    .min(3, "must be at 3 characters long"),
  confirmPassword: yup
    .string()
    .required("confirm your password")
    .trim()
    .oneOf([yup.ref("password")], "passwords do not match - try again"),
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

  const sendData = (data) => registerUser(data);

  async function registerUser(newUser) {
    try {
      const response = await axios.post(endpoint, newUser);

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
