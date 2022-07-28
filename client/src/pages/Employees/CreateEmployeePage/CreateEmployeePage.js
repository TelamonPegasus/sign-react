import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { styles } from "./styles";

import { usePopupContext } from "context/PopupProvider";
import { useAuthContext } from "context/AuthProvider";

import { EmployeeForm } from "components/EmployeeForm";
import { useAxiosPrivate } from "customHooks";
import { validationSchema } from "utilities";

const CreateEmployeePage = () => {
  const endpoint = "/api/employees";
  const { openToast } = usePopupContext();
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema.createEmployee) });

  const sendData = async (data) => {
    const newData = { ...data, roles: auth?.roles };

    try {
      await axiosPrivate.post(`${endpoint}`, newData);

      navigate(-1);
    } catch (error) {
      openToast(error.response.statusText, "error");
    }
  };

  return (
    <div style={styles.container}>
      <EmployeeForm
        avatar={<PersonAddAltOutlinedIcon />}
        heading="add employee"
        control={control}
        errors={errors}
        handleSubmitData={handleSubmit(sendData)}
        buttonText="create"
      />
    </div>
  );
};

export default CreateEmployeePage;
