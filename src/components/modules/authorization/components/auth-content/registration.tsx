import React, { useState, useEffect } from "react";
import Field from "../../../../common/components/field";
import {FieldTypes} from "../../../../common/components/field/field";
import SubmitButton from "../../../../common/components/submit-button";
import {ButtonTypes} from "../../../../common/components/submit-button/submit-button";
import CustomCheckbox from "../../../../common/components/custom-checkbox";
import {Link} from "react-router-dom";

import "./auth-wrapper.scss";

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
    const [isSubmit, setIsSubmit] = useState(false);
    const [accept, setAccept] = useState(false);
    const [errorAccept, setErrorAccept] = useState("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    useEffect(() => {
        if (!accept && isSubmit) {
            setErrorAccept("You must be accept the agreement.");
        } else setErrorAccept("");
    }, [accept, isSubmit]);

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
        setIsSubmit(true);
    };

    const { name, login, password, confirmPassword }: {name?: string, login?: string, password?: string, confirmPassword?: string} = formErrors;

    return(
        <div className="Registration Auth-wrapper">
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

                <CustomCheckbox checked={accept} onChange={setAccept} error={errorAccept} />

                <SubmitButton
                    type={ButtonTypes.submit}
                    disabled={!accept}
                >
                    Sign In
                </SubmitButton>
            </form>

            <div className="not-member">
                <span>Already a member? </span>
                <Link to="/">Sign up</Link>
            </div>
        </div>
    );
};

export default Registration;