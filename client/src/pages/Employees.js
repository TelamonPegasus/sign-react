import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { CreateUserForm } from "components/EmployeeForm";
import axios from "api/axios";
import EmployeesNavigation from "components/EmployeesNavigation";
import { EmployeesTable } from "components/EmployeesTable";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
};

const Employees = () => {
  const [employees, setEmployees] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get("/api/employees", {
          signal: controller.signal,
        });

        isMounted && setEmployees(response.data);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getEmployees();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const removeEmployeeHandler = async (id) => {
    const controller = new AbortController();

    try {
      await axiosPrivate.delete(`/api/employees/${id}`, {
        signal: controller.signal,
      });

      const newList = employees.filter((item) => item._id !== id);
      setEmployees(newList);
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <main style={styles.container}>
      <div>
        {employees?.length ? (
          <EmployeesTable
            employeesData={employees}
            onRemove={removeEmployeeHandler}
          />
        ) : (
          <p>No employees to display</p>
        )}
      </div>

      <EmployeesNavigation />
    </main>
  );
};

export default Employees;
