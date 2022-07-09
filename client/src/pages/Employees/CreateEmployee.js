import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { EmployeeForm } from "components/EmployeeForm";

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const CreateEmployee = () => {
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const sendData = async (data) => {
    const { name, surname } = data;

    try {
      // const response = await api.post(LOGIN_URL, data);

      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // console.log("roles:", roles);

      await axiosPrivate.post(
        "/api/employees",
        JSON.stringify({ name, surname }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      navigate("/data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <EmployeeForm
        control={control}
        errors={errors}
        handleSubmitData={handleSubmit(sendData)}
        buttonText="create"
      />
    </div>
  );
};

export default CreateEmployee;
