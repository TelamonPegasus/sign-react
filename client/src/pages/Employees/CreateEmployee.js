import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { EmployeeForm } from "components/EmployeeForm";

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  surname: yup.string().required("surname is required"),
});

const CreateEmployee = () => {
  const endpoint = "/api/employees";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const sendData = async (data) => {
    try {
      await axiosPrivate.post(`${endpoint}`, data);

      navigate(-1);
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
