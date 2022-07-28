import React, {useState} from "react";
import Field from "../../../../../common/components/field";
import {FieldTypes} from "../../../../../common/components/field/field";
import SubmitButton from "../../../../../common/components/submit-button";
import {ButtonTypes} from "../../../../../common/components/submit-button/submit-button";

const Registration = () => {
    interface ValidateProps {
        name?: string,
        login?: string,
        password?: string,
        confirmPassword?: string,
    }

    const initialValues = { name: "", login: "", password: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormValues({ ...formValues, [name]: value });
    };


    const validate = (values: ValidateProps) => {
        const errors: ValidateProps = {};
        if (!values.name) {
            errors.name = "Username is required!";
        }
        if (!values.login) {
            errors.login = "Login is required!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Password is required";
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        if (Object.keys(formErrors).length == 0) {
            console.log("formValues");
        }
    };

    const { name, login, password, confirmPassword }: {name?: string, login?: string, password?: string, confirmPassword?: string} = formErrors;

    return(
        <div className="Registration auth-wrapper">
            <h1 className="auth-title">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    label="Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    error={name}
                />
                <Field
                    label="Login"
                    name="login"
                    value={formValues.login}
                    onChange={handleChange}
                    error={login}
                />
                <Field
                    label="Password"
                    name="password"
                    type={FieldTypes.password}
                    value={formValues.password}
                    onChange={handleChange}
                    error={password}
                />
                <Field
                    label="Enter your password again"
                    name="confirmPassword"
                    type={FieldTypes.password}
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    error={confirmPassword}
                />
                <SubmitButton
                    type={ButtonTypes.submit}>
                    Sign In
                </SubmitButton>
            </form>

            <div className="not-member">
                <span>Already a member? </span>
                <a>Sign up</a>
            </div>        </div>
    );
};

export default Registration;