import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "axios";

import { useToastContext } from "context/ToastProvider";
import { useAuthContext } from "context/AuthProvider";
import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { EmployeesTable } from "components/EmployeesTable";
import { StyledButton } from "components/StyledButton";
import { Loader } from "components/Loader";
import { Error } from "components/Error";

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

const Employees = () => {
  const endpoint = "/api/employees";
  const [employees, setEmployees] = useState({ status: "loading", data: [] });
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const classes = useStyles();
  const { displayToast } = useToastContext();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getEmployeesData = async () => {
      try {
        const response = await axiosPrivate.get(endpoint, {
          cancelToken: source.token,
        });

        setEmployees({ status: "success", data: response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          displayToast(error.message, "error");
          setEmployees((prev) => ({ ...prev, status: "error" }));
        }
      }
    };
    const timeID = setTimeout(getEmployeesData, 2000);

    return () => {
      source.cancel();
      clearTimeout(timeID);
    };
  }, []);

  const removeEmployeeHandler = async (id) => {
    try {
      await axiosPrivate.delete(`${endpoint}/${id}`, {
        data: { roles: auth?.roles },
      });

      const filteredList = employees.data.filter((item) => item._id !== id);

      setEmployees((prevState) => ({ ...prevState, data: filteredList }));
    } catch (error) {
      displayToast(error.response.statusText, "error");
    }
  };

  const handleNavigate = () => navigate(-1);
  const handleOnClick = () => navigate("/create-employee");

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
          <Loader text="loading list" />
        ) : employees.status === "error" ? (
          <Error text="error occurred" />
        ) : employees.status === "success" && employees.data.length ? (
          <EmployeesTable
            employeesData={employees.data}
            onRemove={removeEmployeeHandler}
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
