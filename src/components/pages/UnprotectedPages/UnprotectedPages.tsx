import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppSelector } from "../../core/redux/redux";
import { Login, Registration } from "../../modules/authorization/components/AuthContent";
import authImage from "../../assests/images/auth.png";
import { ErrorMessage } from "../../common/components/error-message/error-message";

import s from "./UnprotectedPages.module.scss";

export const UnprotectedPages = () => {
    const navigate = useNavigate();

    const { error } = useAppSelector(state => state.authorizationReducer);

    useEffect(() => {
        navigate("/");
    }, []);

    return (
        <div className={s.UnprotectedPages}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>

            <div className={s.UnprotectedPages__imageWrapper}>
                { error && <ErrorMessage message="Что-то пошло не так..." /> }
                <img className={s.authImage} alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};