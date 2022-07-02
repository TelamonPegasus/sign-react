import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { validationForm } from "validationForm";
import { SignUp } from "components/LogRegisterForm";

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

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const SignUpPage = ({ setValue }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationForm),
  });

  const sendData = (data) => registerUser(data);

  async function registerUser(newUser) {
    try {
      const response = await api.post("/api/register", newUser);

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
