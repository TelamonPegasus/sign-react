import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

import { TextInputController } from "components/LogRegisterForm/TextInputController";
import { StyledFormButton } from "components/LogRegisterForm/StyledFormButton";
import { StyledButton } from "components/StyledButton";
import { useNavigate } from "react-router-dom";

const styles = {
  form: { maxWidth: 400, margin: "0 auto", marginTop: 50 },
  textRequired: {
    color: "#d63e2f",
    letterSpacing: 2,
    wordSpacing: 3,
    marginBottom: 15,
  },
  inputsContainer: { display: "flex", flexDirection: "column", gap: 10 },
};

const EmployeeForm = (props) => {
  const { control, errors, handleSubmitData, buttonText } = props;
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);

  return (
    <>
      <form style={styles.form}>
        <Typography
          color="textSecondary"
          variant="body2"
          style={styles.textRequired}
        >
          *Fields required
        </Typography>
        <div style={styles.inputsContainer}>
          <TextInputController
            control={control}
            name="name"
            label="name"
            defaultValue=""
            error={!!errors.surname}
            message={errors.name?.message ?? ""}
            autoFocus
          />

          <TextInputController
            control={control}
            name="surname"
            label="surname"
            defaultValue=""
            error={!!errors.surname}
            message={errors.surname?.message ?? ""}
          />
        </div>
        <StyledFormButton onClick={handleSubmitData} text={buttonText} />
      </form>

      <StyledButton onClick={handleNavigate} />
    </>
  );
};

EmployeeForm.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  handleSubmitData: PropTypes.func,
};

export default EmployeeForm;
