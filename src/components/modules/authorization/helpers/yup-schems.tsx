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
        .min(3, "Password must be at 3 char long")
        .matches(/[a-z]/, "Password must contain one lowercase  latin letter")
        .matches(/[A-Z]/, "Password must contain one lowercase capital latin letter")
        .matches(/[1-9]/, "Password must contain one number"),
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
        .min(3, "Password must be at 3 char long")
        .matches(/[a-z]/, "Password must contain one lowercase  latin letter")
        .matches(/[A-Z]/, "Password must contain one lowercase capital latin letter")
        .matches(/[1-9]/, "Password must contain one number"),
});