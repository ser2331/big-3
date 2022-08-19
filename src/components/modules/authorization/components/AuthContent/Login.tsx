import React, {FC, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useAppDispatch } from "../../../../core/redux/redux";
import { authService } from "../../../../api/authService/authService";
import { authorizationSlice } from "../../AuthorizationSlice";
import { loginSchema } from "../../helpers/yup-schems";
import StorageService from "../../../../common/helpers/storageService/storage-service";
import { Field } from "../../../../common/components/field/field";
import { CustomButton } from "../../../../common/components/custom-button/custom-button";
import { IGetToken } from "../../interfaces/authorization-interfaces";
import Types from "../../../../types";

import s from "./AuthWrapper.module.scss";

const { localStorage } = Types;

const { setErrorIndicator, setUserData } = authorizationSlice.actions;

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [getToken, {data, isError}] = authService.useGetSignInTokenMutation();

    const formOptions = { resolver: yupResolver(loginSchema) };
    const {register, handleSubmit, formState: { errors }} = useForm<IGetToken>(formOptions);

    useEffect(() => {
        if (data && !isError) {
            dispatch(setErrorIndicator(isError));
            dispatch(setUserData(data));

            StorageService.set(localStorage.token, data.token);
            StorageService.set(localStorage.name, data.name);
            StorageService.set(localStorage.avatarUrl, data.avatarUrl);
            navigate("teams");
        } else {
            dispatch(setErrorIndicator(isError));
        }
    }, [data, isError]);

    const submit: SubmitHandler<IGetToken> = async (introducedData) => {
        await getToken(introducedData);
    };

    return (
        <div className={`${s.Login} ${s.AuthWrapper}`}>
            <h1 className="auth-title">Sign In</h1>
            <form onSubmit={handleSubmit(submit)}>
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
                    type="submit">
                    Sign In
                </CustomButton>
            </form>

            <div className={s.notMember}>
                <span>Not a member yet? </span>
                <Link to="/registration">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;