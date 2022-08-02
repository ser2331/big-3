import React, {FC} from "react";
import { useAppSelector } from "../../core/redux/redux";
import { Login } from "../../modules/authorization/components/auth-content";
import authImage from "../../assests/images/auth.png";

import "./login-page.scss";

const LoginPage:FC = () => {
    const { error } = useAppSelector(state => state.authorizationReducer);

    return (
        <div className="LoginPage">
            <Login />

            <div className="LoginPage__image-wrapper">
                {error ? <div className="error-message">User with the specified username / password was not found.</div> : ""}
                <img className="auth-image" alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};

export default LoginPage;