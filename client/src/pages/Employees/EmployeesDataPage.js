import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import axios from "api/axios";
import { EmployeesTable } from "components/EmployeesTable";
import { StyledButton } from "components/StyledButton";

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 20,
//   },
// };

const styles = {
  container: {
    marginTop: 70,
    padding: "0 20px 0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  heading: { color: "#d63e2f" },
};

const Employees = ({ allowedRoles }) => {
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

  const handleNavigate = () => navigate(-1);

  return (
    <main style={styles.container}>
      <h1>
        Employees List <span style={styles.heading}>Available</span>
      </h1>

      <p>
        Below are <strong style={{ color: "darkgreen" }}>employees</strong> data
        imported from MongoDB data base. You can basically create new employee,
        update data or remove them from the server.
      </p>

      <div>
        {employees?.length ? (
          <EmployeesTable
            employeesData={employees}
            onRemove={removeEmployeeHandler}
            allowedRoles={allowedRoles}
          />
        ) : (
          <p>No employees to display</p>
        )}
      </div>

      <StyledButton onClick={handleNavigate} />
    </main>
  );
};

export default Employees;
