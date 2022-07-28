import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineUserAdd } from "react-icons/ai";

import { styles, useStyles } from "./styles";
import { usePopupContext } from "context/PopupProvider";
import { useAuthContext } from "context/AuthProvider";
import { useAxiosPrivate, useGetData } from "customHooks";

import { StyledContainer } from "components/StyledContainer";
import { StyledHeading } from "components/StyledHeading";
import { EmployeesTable } from "components/EmployeesTable";
import { StyledButton } from "components/StyledButton";
import { Loader } from "components/Loader";
import { Error } from "components/Error";

const EmployeesDataPage = () => {
  const endpoint = "/api/employees";
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const classes = useStyles();
  const { openToast, openConfirmationModal } = usePopupContext();

  const { data: employees, setData: setEmployees } = useGetData(endpoint);

  const removeEmployeeHandler = (id) => {
    const removeItemCallback = async () => {
      try {
        await axiosPrivate.delete(`${endpoint}/${id}`, {
          data: { roles: auth?.roles },
        });

        const filteredList = employees.data.filter((item) => item._id !== id);

        setEmployees((prevState) => ({ ...prevState, data: filteredList }));
      } catch (error) {
        openToast(error.response.statusText, "error");
      }
    };

    const config = {
      title: "Remove an employee",
      question: "Are you sure you want to remove an employee?",
      action: removeItemCallback,
    };

    openConfirmationModal(config);
  };

  const handleNavigate = () => navigate(-1);
  const handleOnClick = () => navigate("/create-employee");

  return (
    <StyledContainer>
      <StyledHeading text="Employees List" />

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
    </StyledContainer>
  );
};

export default EmployeesDataPage;
