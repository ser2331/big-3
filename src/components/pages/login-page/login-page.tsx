import React, {FC} from "react";
import authImage from "../../assests/images/auth.png";
import { Login } from "../../modules/authorization/components/auth-content";

import "./login-page.scss";

const LoginPage:FC = () => {
    return(
        <div className="LoginPage">
            <Login />

            <div className="LoginPage__image-wrapper">
                <img className="auth-image" alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};

export default LoginPage;