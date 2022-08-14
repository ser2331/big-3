import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useAppDispatch } from "../../../../core/redux/redux";
import { authorizationSlice } from "../../AuthorizationSlice";
import { registrationSchema } from "../../helpers/yup-schems";
import Field from "../../../../common/components/field";
import { authService } from "../../../../api/authService/authService";
import StorageService from "../../../../common/helpers/storageService/storage-service";
import CustomButton from "../../../../common/components/custom-button";
import CustomCheckbox from "../../../../common/components/custom-checkbox";
import { IGetTokenRegistration } from "../../interfaces/authorization-interfaces";
import Types from "../../../../types";

import "./AuthWrapper.scss";

const { localStorage } = Types;

const { setErrorIndicator, setUserData } = authorizationSlice.actions;

const Registration = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [getToken, {data, isError}] = authService.useGetSignUpTokenMutation();

    const [accept, setAccept] = useState(false);
    const [errorAccept, setErrorAccept] = useState("");

    const formOptions = { resolver: yupResolver(registrationSchema) };

    const {register, handleSubmit, formState: { errors }} = useForm<IGetTokenRegistration>(formOptions);

    useEffect(() => {
        if (!accept && !errors) {
            setErrorAccept("You must be accept the agreement.");
        } else setErrorAccept("");
    }, [accept, errors]);

    useEffect(() => {
        if (data && !isError) {
            StorageService.set(localStorage.token, data.token);
            StorageService.set(localStorage.name, data.name);
            StorageService.set(localStorage.avatarUrl, data.avatarUrl);

            dispatch(setUserData(data));
            navigate("/teams");
        }
        else {
            dispatch(setErrorIndicator(isError));
        }
    }, [data, isError]);

    const submit: SubmitHandler<IGetTokenRegistration> = async (introducedData) => {
        await getToken(introducedData);
    };

    return(
        <div className="Registration Auth-wrapper">
            <h1 className="auth-title">Sign Up</h1>
            <form onSubmit={handleSubmit(submit)}>

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
                    type="submit"
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