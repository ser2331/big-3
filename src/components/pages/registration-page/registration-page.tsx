import React, {FC} from "react";
import authImage from "../../assests/images/auth.png";
import { Registration } from "../../modules/authorization/components/auth-content";

import "./regisrtation-page.scss";

const RegistrationPage:FC = () => {
    return (
        <div className="RegistrationPage">
            <Registration/>

            <div className="RegistrationPage__image-wrapper">
                <img className="auth-image" alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};

export default RegistrationPage;
