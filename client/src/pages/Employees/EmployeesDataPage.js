import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";

import { useAuthContext } from "context/AuthProvider";
import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { EmployeesTable } from "components/EmployeesTable";
import { StyledButton } from "components/StyledButton";
import { Loader } from "components/Loader";

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
  container: {
    marginTop: 70,
    padding: "0 20px 0 20px",
  },
  heading: { textAlign: "center" },
  span: { color: "#d63e2f" },
  tableContainer: { maxWidth: 700, marginBottom: 30 },
  linkIcon: { paddingRight: 3, fontSize: 20, color: "#d63e2f" },
  tableContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  informationText: {
    padding: "20px 0",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#d63e2f",
  },
}));

const Employees = ({ allowedRoles }) => {
  const endpoint = "/api/employees";
  const [employees, setEmployees] = useState({ status: "loading", data: [] });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const { auth } = useAuthContext();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get(endpoint, {
          signal: controller.signal,
        });

        isMounted && setEmployees({ status: "success", data: response.data });
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const timeID = setTimeout(getEmployees, 500);

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeID);
    };
  }, []);

  const removeEmployeeHandler = async (id) => {
    try {
      await axiosPrivate.delete(`${endpoint}/${id}`);

      const newList = employees.data.filter((item) => item._id !== id);

      setEmployees({ data: newList });
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const handleNavigate = () => navigate(-1);

  const handleOnClick = () => {
    auth?.roles.find((role) => role === 5150)
      ? navigate("/create-employee")
      : toast.error(
          () => "You can not add a new Employee. Only admin can do it!",
          toastConfig
        );
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>
        Employees <span style={styles.span}>LIST</span>
      </h1>

      <p>
        Below are <strong style={{ color: "darkgreen" }}>employees</strong> data
        imported from MongoDB data base. You can basically create new employee,
        update data or remove them from the server.
      </p>

      <div style={styles.tableContent}>
        {employees.status === "loading" ? (
          <Loader text="loading table" />
        ) : employees.data?.length ? (
          <EmployeesTable
            employeesData={employees.data}
            onRemove={removeEmployeeHandler}
            allowedRoles={allowedRoles}
          />
        ) : (
          <p style={styles.informationText}>
            List is empty - please add a new employee
          </p>
        )}
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleOnClick}
        >
          <AiOutlineUserAdd style={styles.linkIcon} />
          add employee
        </Button>
      </div>

      <StyledButton onClick={handleNavigate} />
    </main>
  );
};

export default Employees;
