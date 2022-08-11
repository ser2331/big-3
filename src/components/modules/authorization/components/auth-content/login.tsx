import React, {FC, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useAppDispatch } from "../../../../core/redux/redux";
import { authService } from "../../../../api/authService/authService";
import { authorizationSlice } from "../../AuthorizationSlice";
import { loginSchema } from "../../helpers/yup-schems";
import Field from "../../../../common/components/field";
import CustomButton from "../../../../common/components/custom-button";
import {ButtonTypes} from "../../../../common/components/custom-button/custom-button";
import { IGetToken } from "../../interfaces/authorization-interfaces";

import "./auth-wrapper.scss";

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [getToken, {data, isError}] = authService.useGetSignInTokenMutation();

    const { setUserData, setErrorIndicator } = authorizationSlice.actions;

    const formOptions = { resolver: yupResolver(loginSchema) };
    const {register, handleSubmit, formState: { errors }} = useForm(formOptions);

    useEffect(() => {
        if (data && !isError) {
            dispatch(setErrorIndicator(isError));
            dispatch(setUserData(data));
            navigate("teams");
        } else {
            dispatch(setErrorIndicator(isError));
        }
    }, [data, isError]);

    const submit = async (introducedData: IGetToken) => {
        await getToken(introducedData);
    };

    return (
        <div className="Login Auth-wrapper">
            <h1 className="auth-title">Sign In</h1>
            <form onSubmit={handleSubmit((introducedData: any) => submit(introducedData))}>
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