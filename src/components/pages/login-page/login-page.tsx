import React, {FC} from "react";
import { useAppSelector } from "../../core/redux/redux";
import { Login } from "../../modules/authorization/components/auth-content";
import ErrorMessage from "../../common/components/error-message";
import authImage from "../../assests/images/auth.png";

import "./login-page.scss";

const LoginPage:FC = () => {
    const { error } = useAppSelector(state => state.authorizationReducer);
    const { isMobile } = useAppSelector(state => state.teamsReducer);

    return (
        <div className="LoginPage">
            {error && isMobile ? <ErrorMessage message="User with the specified username / password was not found." /> : ""}

            <Login />

            <div className="LoginPage__image-wrapper">
                {error ? <ErrorMessage message="User with the specified username / password was not found." /> : ""}

                <img className="auth-image" alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};

export default LoginPage;