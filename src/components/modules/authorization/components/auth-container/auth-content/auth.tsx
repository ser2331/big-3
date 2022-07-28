import React, { FC, useState } from "react";
import Field from "../../../../../common/components/field";
import SubmitButton from "../../../../../common/components/submit-button";
import {ButtonTypes} from "../../../../../common/components/submit-button/submit-button";
import {FieldTypes} from "../../../../../common/components/field/field";

const Auth: FC = () => {
    interface ValidateProps {
        login?: string,
        password?: string,
    }
    const initialValues = { login: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values: ValidateProps) => {
        const errors: ValidateProps = {};
        if (!values.login) {
            errors.login = "Username is required!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
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

    const { login, password }: {login?: string, password?: string} = formErrors;

    return (
        <div className="Auth auth-wrapper">
            <h1 className="auth-title">Sign In</h1>
            <form onSubmit={handleSubmit}>
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
                <SubmitButton
                    type={ButtonTypes.submit}>
                    Sign In
                </SubmitButton>
            </form>

            <div className="not-member">
                <span>Not a member yet? </span>
                <a>Sign up</a>
            </div>
        </div>
    );
};

export default Auth;