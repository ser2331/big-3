import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .required("name is required")
        .min(3, "Password must be at 3 char long"),
    login: Yup.string()
        .required("login is required")
        .min(3, "Password must be at 3 char long"),
    password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be at 3 char long"),
    confirmPassword: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("password")], "Passwords does not match"),
});

export const loginSchema = Yup.object().shape({
    login: Yup.string()
        .required("login is required")
        .min(3, "login must be at 3 char long"),
    password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be at 3 char long"),
});