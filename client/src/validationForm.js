import * as Yup from "yup";

export const validationForm = Yup.object().shape({
  password: Yup.string()
    .required("please enter your password")
    .lowercase()
    .min(3, "Password must be at 3 char long"),
  confirmPassword: Yup.string()
    .required("please confirm your password")
    .trim()
    .lowercase()
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});
