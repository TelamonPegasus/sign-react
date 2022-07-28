import PropTypes from "prop-types";

import { styles } from "./styles";

import { TextInputController } from "components/Inputs/TextInputController";
import { StyledFormButton } from "components/StyledFormButton";
import { StyledButton } from "components/StyledButton";
import { useNavigate } from "react-router-dom";
import { StyledForm } from "components/StyledForm";
import { StyledTextRequired } from "components/StyledTextRequired";
import { FormHeader } from "components/FormHeader";

const EmployeeForm = (props) => {
  const { control, errors, handleSubmitData, buttonText, avatar, heading } =
    props;
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);

  return (
    <>
      <StyledForm>
        <FormHeader avatar={avatar} heading={heading} />
        <StyledTextRequired />

        <div style={styles.inputsContainer}>
          <TextInputController
            control={control}
            name="name"
            label="name*"
            defaultValue=""
            error={!!errors.surname}
            message={errors.name?.message ?? ""}
            autoFocus
          />

          <TextInputController
            control={control}
            name="surname"
            label="surname*"
            defaultValue=""
            error={!!errors.surname}
            message={errors.surname?.message ?? ""}
          />
        </div>
        <StyledFormButton onClick={handleSubmitData} text={buttonText} />
      </StyledForm>

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
