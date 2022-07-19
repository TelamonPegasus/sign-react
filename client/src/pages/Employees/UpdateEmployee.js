import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useToastContext } from "context/ToastProvider";
import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { EmployeeForm } from "components/EmployeeForm";

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  surname: yup.string().required("surname is required"),
});

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const UpdateEmployee = () => {
  const endpoint = "/api/employees";
  const [employee, setEmployee] = useState();
  const { displayToast } = useToastContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get(`${endpoint}/${id}`, {
          signal: controller.signal,
        });

        isMounted && setEmployee(response.data);
      } catch (error) {
        displayToast(error.response.statusText, "error");
      }
    };

    getEmployees();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const defaultValues = {
    name: employee?.name || "",
    surname: employee?.surname || "",
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue("name", defaultValues.name);
      setValue("surname", defaultValues.surname);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [setValue, defaultValues.name, defaultValues.surname]);

  const updateEmployeeData = async (data) => {
    try {
      await axiosPrivate.put(`${endpoint}/${id}`, data);

      navigate("/employees");
    } catch (error) {
      displayToast(error.response.statusText, "error");
    }
  };

  return (
    <div style={styles.container}>
      <EmployeeForm
        control={control}
        errors={errors}
        handleSubmitData={handleSubmit(updateEmployeeData)}
        buttonText="update"
      />
    </div>
  );
};

export default UpdateEmployee;
