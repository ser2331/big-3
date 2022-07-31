import React from "react";
import logo from "../../../assests/images/logo.png";
import userPhoto from "../../../assests/images/profile.png";

import "./header.scss";

const Header = () => {
    const userName = "Dukov Sergey";
    return (
        <div className="Header">
            <img className="Header__logo" alt="logo" src={logo}/>

            <div className="Header__user-info-wrapper">
                <span className="user-name">{userName}</span>
                <img alt="userPhoto" src={userPhoto} />
            </div>

        </div>
    );
};

export default Header;
