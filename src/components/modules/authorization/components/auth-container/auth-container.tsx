import React, {FC} from "react";
import { Registration, Auth} from "./auth-content";
import authImage from "../../../../assests/images/auth.png";

import "./auth-container.scss";

const AuthContainer:FC = () => {
    return(
        <div className="AuthContainer">

            <Auth />
            {/*<Registration />*/}

            <div className="AuthContainer__image-wrapper">
                <img className="auth-image" alt="auth-image" src={authImage}/>
            </div>
        </div>
    );
};

export default AuthContainer;