import React from "react";
import { useAppSelector } from "../../../core/redux/redux";
import logo from "../../../assests/images/logo.png";
import userPhoto from "../../../assests/images/profile.png";

import "./header.scss";

const Header = () => {
    const { name, avatarUrl } = useAppSelector(state => state.authorizationReducer);

    return (
        <div className="Header">
            <img className="Header__logo" alt="logo" src={logo}/>

            <div className="Header__user-info-wrapper">
                <span className="user-name">{name}</span>
                <img alt="userPhoto" src={avatarUrl || userPhoto} />
            </div>

        </div>
    );
};

export default Header;
