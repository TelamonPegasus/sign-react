import { useNavigate } from "react-router-dom";

import { StyledButton } from "components/StyledButton";

import Employees from "./Employees";

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

const EmployeesDataPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);

  return (
    <div style={styles.container}>
      <h1>
        Employees List <span style={styles.heading}>Available</span>
      </h1>

      <p>
        Below are <strong style={{ color: "darkgreen" }}>employees</strong> data
        imported from MongoDB data base. You can basically create new employee,
        update data or remove them from the server.
      </p>

      <Employees />

      <StyledButton onClick={handleNavigate} />
    </div>
  );
};

export default EmployeesDataPage;
