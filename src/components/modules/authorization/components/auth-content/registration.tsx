import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { registrationSchema } from "../../helpers/yup-schems";
import Field from "../../../../common/components/field";
import CustomButton from "../../../../common/components/custom-button";
import { ButtonTypes } from "../../../../common/components/custom-button/custom-button";
import CustomCheckbox from "../../../../common/components/custom-checkbox";

import "./auth-wrapper.scss";

const Registration = () => {
    const [accept, setAccept] = useState(false);
    const [errorAccept, setErrorAccept] = useState("");

    const formOptions = { resolver: yupResolver(registrationSchema) };

    const {register, handleSubmit, formState: { errors }} = useForm(formOptions);

    useEffect(() => {
        if (!accept) {
            setErrorAccept("You must be accept the agreement.");
        } else setErrorAccept("");
    }, [accept]);

    return(
        <div className="Registration Auth-wrapper">
            <h1 className="auth-title">Sign Up</h1>
            <form onSubmit={handleSubmit((data) => {alert(JSON.stringify(data));})}>

                <Field
                    label="Name"
                    register={register}
                    registerName="name"
                    error={errors.name}
                />
                <Field
                    label="Login"
                    register={register}
                    registerName="login"
                    error={errors.login}
                />
                <Field
                    label="Password"
                    register={register}
                    registerName="password"
                    error={errors.password}
                />
                <Field
                    label="Enter your password again"
                    register={register}
                    registerName="confirmPassword"
                    error={errors.confirmPassword}
                />

                <CustomCheckbox checked={accept} onChange={setAccept} error={errorAccept} />

                <CustomButton
                    type={ButtonTypes.submit}
                    disabled={!accept}
                >
                    Sign In
                </CustomButton>
            </form>

            <div className="not-member">
                <span>Already a member? </span>
                <Link to="/">Sign up</Link>
            </div>
        </div>
    );
};

export default Registration;