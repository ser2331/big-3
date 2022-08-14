import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppSelector } from "../../core/redux/redux";
import { Login, Registration } from "../../modules/authorization/components/AuthContent";
import authImage from "../../assests/images/auth.png";
import ErrorMessage from "../../common/components/error-message";

import "./UnprotectedPages.scss";

export const UnprotectedPages = () => {
    const navigate = useNavigate();

    const { error } = useAppSelector(state => state.authorizationReducer);

    useEffect(() => {
        navigate("/");
    }, []);

    return (
        <div className="UnprotectedPages">
            <Routes location="/">
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>

            <div className="UnprotectedPages__image-wrapper">
                { error && <ErrorMessage message="Что-то пошло не так..." /> }
                <img className="auth-image" alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};