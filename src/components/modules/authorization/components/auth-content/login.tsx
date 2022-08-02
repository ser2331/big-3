import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { loginSchema } from "../../helpers/yup-schems";
import Field from "../../../../common/components/field";
import CustomButton from "../../../../common/components/custom-button";
import {ButtonTypes} from "../../../../common/components/custom-button/custom-button";

import "./auth-wrapper.scss";


const Login: FC = () => {
    const formOptions = { resolver: yupResolver(loginSchema) };
    const {register, handleSubmit, formState: { errors }} = useForm(formOptions);

    return (
        <div className="Login Auth-wrapper">
            <h1 className="auth-title">Sign In</h1>
            <form onSubmit={handleSubmit((data) => {alert(JSON.stringify(data));})}>
                <Field
                    label="Name"
                    register={register}
                    registerName="login"
                    error={errors.login}
                />

                <Field
                    label="Name"
                    register={register}
                    registerName="password"
                    error={errors.password}
                />

                <CustomButton
                    type={ButtonTypes.submit}>
                    Sign In
                </CustomButton>
            </form>

            <div className="not-member">
                <span>Not a member yet? </span>
                <Link to="/registration">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;