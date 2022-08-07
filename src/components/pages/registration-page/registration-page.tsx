import React, { FC } from "react";
import { useAppSelector } from "../../core/redux/redux";
import { Registration } from "../../modules/authorization/components/auth-content";
import ErrorMessage from "../../common/components/error-message";
import authImage from "../../assests/images/auth.png";

import "./regisrtation-page.scss";

const RegistrationPage:FC = () => {
    const { error } = useAppSelector(state => state.authorizationReducer);

    return (
        <div className="RegistrationPage auth-page-container">
            {error ? <ErrorMessage message="Что-то пошло не так.." /> : ""}

            <Registration/>

            <div className="RegistrationPage__image-wrapper">
                <img className="auth-image" alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};

export default RegistrationPage;
