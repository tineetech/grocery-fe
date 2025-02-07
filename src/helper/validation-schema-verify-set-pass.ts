// helper/validation-schema-login.ts
import * as Yup from "yup";

export const verifySetPass = Yup.object().shape({
  username: Yup.string()
    .max(200, "Username maximal 200 characters")
    .required("Username is required"),
  first_name: Yup.string()
    .max(200, "First Name maximal 200 characters")
    .required("First Name is required"),
  last_name: Yup.string()
    .max(200, "First Name maximal 200 characters")
    .required("First Name is required"),
  phone: Yup.number()
    // .max(200, "Phone must be at least 5ch aracters")
    .required("First Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

export const verifySetPassProfileGoogle = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});
