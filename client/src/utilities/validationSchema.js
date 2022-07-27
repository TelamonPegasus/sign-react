import * as yup from "yup";

// REGEX
const PASSWORD_REG =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// validation

const login = yup.object().shape({
  email: yup.string().required("email is required").email(),
  password: yup.string().required("password is required"),
});

const register = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().required("email is required").email(),
  password: yup
    .string()
    .required("enter your password")
    .trim()
    .matches(
      PASSWORD_REG,
      "Has to be minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  confirmPassword: yup
    .string()
    .required("confirm your password")
    .trim()
    .oneOf([yup.ref("password")], "passwords do not match"),
});

const createEmployee = yup.object({
  name: yup.string().required("name is required"),
  surname: yup.string().required("surname is required"),
});

const updateEmployee = yup.object({
  name: yup.string().required("name is required"),
  surname: yup.string().required("surname is required"),
});

const validationSchema = {
  login,
  register,
  createEmployee,
  updateEmployee,
};

export default validationSchema;
