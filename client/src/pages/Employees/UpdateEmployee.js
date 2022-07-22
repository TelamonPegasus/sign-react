import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { useToastContext } from "context/ToastProvider";
import { useAuthContext } from "context/AuthProvider";
import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { EmployeeForm } from "components/EmployeeForm";
import { Loader } from "components/Loader";
import { Error } from "components/Error";

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  surname: yup.string().required("surname is required"),
});

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const UpdateEmployee = () => {
  const endpoint = "/api/employees";
  const [employee, setEmployee] = useState({ status: "loading", data: [] });
  const { displayToast } = useToastContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuthContext();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getEmployeeData = async () => {
      try {
        const response = await axiosPrivate.get(`${endpoint}/${id}`, {
          cancelToken: source.token,
        });

        setEmployee({ status: "success", data: response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          displayToast(error.message, "error");
          setEmployee((prev) => ({ ...prev, status: "error" }));
        }
      }
    };

    const timeID = setTimeout(getEmployeeData, 1_000);

    return () => {
      source.cancel();
      clearTimeout(timeID);
    };
  }, [reset]);

  const defaultValues = {
    name: employee.data?.name || "",
    surname: employee.data?.surname || "",
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue("name", defaultValues.name);
      setValue("surname", defaultValues.surname);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [setValue, defaultValues.name, defaultValues.surname]);

  const updateEmployeeData = async (data) => {
    const newData = { ...data, roles: auth?.roles };

    try {
      await axiosPrivate.put(`${endpoint}/${id}`, newData);

      navigate("/employees");
    } catch (error) {
      displayToast(error.response.statusText, "error");
    }
  };

  return (
    <div style={styles.container}>
      {employee.status === "loading" ? (
        <Loader text="loading employee's data" />
      ) : employee.status === "error" ? (
        <Error text="error occurred" />
      ) : (
        <EmployeeForm
          control={control}
          errors={errors}
          handleSubmitData={handleSubmit(updateEmployeeData)}
          buttonText="update"
        />
      )}
    </div>
  );
};

export default UpdateEmployee;
