import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { EmployeeForm } from "components/EmployeeForm";
import { StyledButton } from "components/StyledButton";
import { useEffect, useState } from "react";

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // {
  // resolver: yupResolver(validationSubscriber),
  // }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get(`/api/employees/${id}`, {
          signal: controller.signal,
        });

        isMounted && setEmployee(response.data);
      } catch (err) {
        console.error(err);
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
    const { name, surname } = data;

    try {
      await axiosPrivate.put(
        `/api/employees/${id}`,
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
        handleSubmitData={handleSubmit(updateEmployeeData)}
        buttonText="update"
      />
    </div>
  );
};

export default UpdateEmployee;
